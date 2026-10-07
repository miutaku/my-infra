#!/usr/bin/env python3
"""Copy current OCI backups to IDrive over TLS; never store payloads or print secrets.

Requires boto3 and an authenticated bws CLI. Historical noncurrent OCI versions
remain in OCI; restic snapshot history in the current repository is copied intact.
Freeze all three backup CronJobs in Git before --copy, then verify before cutover.
"""
import argparse
import base64
import concurrent.futures
import hashlib
import json
from pathlib import Path
import subprocess
import sys

import boto3
from botocore.config import Config

BUCKETS = {'db-backup': 'miutaku-my-infra-backup',
           'db-backup-immutable': 'miutaku-my-infra-db-backup'}
CRONJOBS = [('infra-backup', 'nas-backup'), ('infra-db', 'mariadb-backup'),
            ('monitoring', 'victoria-metrics-backup')]
REQUIRED = ['MY_INFRA_IDRIVE_S3_ACCESS_KEY', 'MY_INFRA_IDRIVE_S3_SECRET_KEY',
            'DB_BACKUP_OCI_NAMESPACE', 'DB_BACKUP_OCI_S3_ACCESS_KEY',
            'DB_BACKUP_OCI_S3_SECRET_KEY']


def cli_json(args):
    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(f'{args[0]} failed; sensitive output suppressed')
    return json.loads(result.stdout)


def clients():
    secrets = {x['key']: x['value'] for x in cli_json(['bws', 'secret', 'list'])}
    missing = [name for name in REQUIRED if not secrets.get(name)]
    if missing:
        raise RuntimeError('Missing Bitwarden entries: ' + ', '.join(missing))
    cfg = Config(signature_version='s3v4', max_pool_connections=16,
                 retries={'max_attempts': 5, 'mode': 'standard'},
                 s3={'addressing_style': 'path'},
                 request_checksum_calculation='when_required',
                 response_checksum_validation='when_required')
    session = boto3.session.Session()
    source = session.client('s3', endpoint_url=(
        f"https://{secrets['DB_BACKUP_OCI_NAMESPACE']}.compat.objectstorage.ap-tokyo-1.oraclecloud.com"),
        region_name='ap-tokyo-1', config=cfg,
        aws_access_key_id=secrets['DB_BACKUP_OCI_S3_ACCESS_KEY'],
        aws_secret_access_key=secrets['DB_BACKUP_OCI_S3_SECRET_KEY'])
    target = session.client('s3', endpoint_url='https://s3.ap-northeast-1.idrivee2.com',
        region_name='ap-northeast-1', config=cfg,
        aws_access_key_id=secrets['MY_INFRA_IDRIVE_S3_ACCESS_KEY'],
        aws_secret_access_key=secrets['MY_INFRA_IDRIVE_S3_SECRET_KEY'])
    return source, target


def frozen():
    for ns, name in CRONJOBS:
        job = cli_json(['kubectl', '--kubeconfig', str(Path.home() / '.kube/home-k8s.yaml'),
                        '-n', ns, 'get', 'cronjob', name, '-o', 'json'])
        if not job['spec'].get('suspend') or job.get('status', {}).get('active'):
            raise RuntimeError(f'{ns}/{name} must be suspended and inactive before copying')


def configure(target):
    for bucket in BUCKETS.values():
        target.head_bucket(Bucket=bucket)
        target.put_bucket_versioning(Bucket=bucket, VersioningConfiguration={'Status': 'Enabled'})
        target.put_bucket_encryption(Bucket=bucket, ServerSideEncryptionConfiguration={
            'Rules': [{'ApplyServerSideEncryptionByDefault': {'SSEAlgorithm': 'AES256'}}]})
        if bucket.endswith('-db-backup'):
            target.put_object_lock_configuration(Bucket=bucket, ObjectLockConfiguration={
                'ObjectLockEnabled': 'Enabled',
                'Rule': {'DefaultRetention': {'Mode': 'COMPLIANCE', 'Days': 30}}})
        else:
            # Explicitly approved: only noncurrent versions expire after 30 days.
            # Preserve unrelated rules and the user-created NAS Object Lock.
            try:
                rules = target.get_bucket_lifecycle_configuration(Bucket=bucket)['Rules']
            except target.exceptions.ClientError as exc:
                if exc.response['Error']['Code'] != 'NoSuchLifecycleConfiguration':
                    raise
                rules = []
            identifier = 'retain-previous-versions-30-days-as-in-oci'
            rules = [r for r in rules if r.get('ID') != identifier]
            rules.append({'ID': identifier, 'Status': 'Enabled', 'Prefix': '',
                          'NoncurrentVersionExpiration': {'NoncurrentDays': 30}})
            target.put_bucket_lifecycle_configuration(Bucket=bucket,
                                                      LifecycleConfiguration={'Rules': rules})
    validate_settings(target)


def validate_settings(target):
    for bucket in BUCKETS.values():
        assert target.get_bucket_versioning(Bucket=bucket)['Status'] == 'Enabled'
        encryption = target.get_bucket_encryption(Bucket=bucket)
        assert encryption['ServerSideEncryptionConfiguration']['Rules'][0][
            'ApplyServerSideEncryptionByDefault']['SSEAlgorithm'] == 'AES256'
        # Absence of a public ACL is checked without changing the recording bucket.
        acl = target.get_bucket_acl(Bucket=bucket)
        assert not any('AllUsers' in g['Grantee'].get('URI', '') or
                       'AuthenticatedUsers' in g['Grantee'].get('URI', '') for g in acl['Grants'])
    lock = target.get_object_lock_configuration(Bucket=BUCKETS['db-backup-immutable'])
    assert lock['ObjectLockConfiguration']['Rule']['DefaultRetention'] == {
        'Mode': 'COMPLIANCE', 'Days': 30}


def inventory(client, bucket):
    return {obj['Key']: obj for page in client.get_paginator('list_objects_v2').paginate(Bucket=bucket)
            for obj in page.get('Contents', [])}


def digest(stream):
    result = hashlib.sha256()
    try:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            result.update(block)
    finally:
        stream.close()
    return result.digest()


def transfer(source, target, source_bucket, key, obj):
    destination = BUCKETS[source_bucket]
    response = source.get_object(Bucket=source_bucket, Key=key, IfMatch=obj['ETag'])
    body = response['Body']
    expected = hashlib.sha256()
    size = obj['Size']
    upload = None
    try:
        # Use a single bounded block for small objects; multipart for larger ones.
        if size <= 16 * 1024 * 1024:
            data = body.read()
            assert len(data) == size
            expected.update(data)
            target.put_object(Bucket=destination, Key=key, Body=data,
                ContentMD5=base64.b64encode(hashlib.md5(data).digest()).decode(),
                Metadata={'source-oci-etag': obj['ETag'].strip('"')})
        else:
            upload = target.create_multipart_upload(Bucket=destination, Key=key,
                Metadata={'source-oci-etag': obj['ETag'].strip('"')})['UploadId']
            parts = []; total = 0
            for index, block in enumerate(iter(lambda: body.read(16 * 1024 * 1024), b''), 1):
                expected.update(block); total += len(block)
                part = target.upload_part(Bucket=destination, Key=key, UploadId=upload,
                    PartNumber=index, Body=block,
                    ContentMD5=base64.b64encode(hashlib.md5(block).digest()).decode())
                parts.append({'PartNumber': index, 'ETag': part['ETag']})
            assert total == size
            target.complete_multipart_upload(Bucket=destination, Key=key, UploadId=upload,
                                              MultipartUpload={'Parts': parts})
            upload = None
    finally:
        body.close()
        if upload:
            target.abort_multipart_upload(Bucket=destination, Key=key, UploadId=upload)
    downloaded = target.get_object(Bucket=destination, Key=key)
    assert downloaded['ContentLength'] == size
    assert digest(downloaded['Body']) == expected.digest(), 'Downloaded content hash differs'


def verify(source, target, source_bucket, key, obj):
    a = source.get_object(Bucket=source_bucket, Key=key, IfMatch=obj['ETag'])
    b = target.get_object(Bucket=BUCKETS[source_bucket], Key=key)
    assert a['ContentLength'] == b['ContentLength'] == obj['Size']
    assert digest(a['Body']) == digest(b['Body']), 'Downloaded content hash differs'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=['inspect', 'configure', 'copy', 'verify'])
    args = parser.parse_args()
    source, target = clients()
    if args.action == 'configure':
        configure(target); print('IDrive private/versioning/30-day DB retention verified'); return
    validate_settings(target)
    if args.action == 'copy':
        frozen()
    for bucket in BUCKETS:
        objects = inventory(source, bucket)
        print(bucket, 'current objects', len(objects), 'bytes', sum(o['Size'] for o in objects.values()), flush=True)
        if args.action == 'inspect':
            continue
        operation = transfer if args.action == 'copy' else verify
        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
            pending = [pool.submit(operation, source, target, bucket, key, obj)
                       for key, obj in objects.items()]
            for n, task in enumerate(concurrent.futures.as_completed(pending), 1):
                task.result()
                if n % 100 == 0: print(bucket, 'hash-verified objects', n, flush=True)
        after = inventory(source, bucket)
        assert {(k, o['ETag'], o['Size']) for k, o in objects.items()} == {
            (k, o['ETag'], o['Size']) for k, o in after.items()}, 'Source changed during migration'
        destination = inventory(target, BUCKETS[bucket])
        assert all(k in destination and destination[k]['Size'] == obj['Size']
                   for k, obj in objects.items())
        print(bucket, args.action, 'PASSED; all current object contents SHA256 verified', flush=True)


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        if isinstance(exc, RuntimeError):
            print(str(exc), file=sys.stderr)
        else:
            # SDK errors may contain signed requests, keys and payload identifiers.
            print('Migration failed:', type(exc).__name__,
                  getattr(exc, 'response', {}).get('Error', {}).get('Code', ''), file=sys.stderr)
        sys.exit(1)
