#!/usr/bin/env python3
"""Prepare private Terraform inputs, preserving tags. No OCI key is exported."""
import argparse
import json
from pathlib import Path
import subprocess
import oci
ROOT=Path(__file__).resolve().parents[1]/'terraform/oci-observability'
TAG={'ReVenterMaintenance':{'Role':'observability'}}
def main():
 p=argparse.ArgumentParser();p.add_argument('--tag-boot-volumes',action='store_true');p.add_argument('--environment',choices=['stg','prd'],default='prd');args=p.parse_args()
 root=Path(__file__).resolve().parents[1]/('terraform/oci-observability-stg' if args.environment=='stg' else 'terraform/oci-observability')
 cfg=oci.config.from_file(profile_name=args.environment.upper());compute=oci.core.ComputeClient(cfg);block=oci.core.BlockstorageClient(cfg)
 output=json.loads(subprocess.check_output(['terraform','output','-json'],cwd=root))
 inputs=root/'deployment.auto.tfvars.json';settings=json.loads(inputs.read_text())
 if not args.tag_boot_volumes:
  tags={}
  for name,node in output['instances']['value'].items():
   current=compute.get_instance(node['id']).data.defined_tags or {}
   tags[name[-2:]]={ns+'.'+key:value for ns,values in current.items() for key,value in values.items()}
  settings.update(os_update_prepared=True,tenancy_id=cfg['tenancy'],monitoring_defined_tags=tags)
  inputs.write_text(json.dumps(settings,indent=2)+'\n');inputs.chmod(0o600)
  print('Private Terraform inputs prepared; review plan before apply')
 else:
  if not output.get('os_update',{}).get('value'):raise RuntimeError('Maintenance IAM must be prepared first')
  for name,node in output['instances']['value'].items():
   attached=compute.list_boot_volume_attachments(settings['availability_domain'],output['os_update']['value']['compartment_id'],instance_id=node['id']).data
   attached=[v for v in attached if v.lifecycle_state=='ATTACHED']
   if len(attached)!=1:raise RuntimeError('Ambiguous attachment; stop')
   volume=block.get_boot_volume(attached[0].boot_volume_id).data
   tags={**(volume.defined_tags or {}),**TAG}
   if tags != (volume.defined_tags or {}):
    block.update_boot_volume(volume.id,oci.core.models.UpdateBootVolumeDetails(defined_tags=tags))
   print(name+': boot-volume maintenance tag applied; existing tags retained')
if __name__=='__main__':main()
