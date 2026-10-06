#!/usr/bin/env python3
"""Compare historical aggregates and exercise representative queries without printing records."""
import argparse
import json
from pathlib import Path
import subprocess
import time
import urllib.parse

ROOT=Path(__file__).resolve().parents[1]
SSH=['-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','-o','UserKnownHostsFile=/tmp/reventer-observability-known-hosts','-i',str(Path.home()/'.ssh/id_ed25519')]
QUERIES=[
 ('metrics','history-up',{'query':'count(up)','time':'2026-10-06T05:20:00Z'}),
 ('metrics','history-env',{'query':'count by (env) ({env=~"stg|prd"})','time':'2026-10-06T05:20:00Z'}),
 ('logs','history-count',{'query':'* _time:[2026-09-08,2026-10-06) | stats by (env) count() as logs'}),
 ('logs','today-before-snapshot',{'query':'* _time:[2026-10-06T00:00:00Z,2026-10-06T05:30:00Z) | stats by (env) count() as logs'}),
]
def normal(service,body):
 if service=='metrics':
  obj=json.loads(body);assert obj['status']=='success'
  return sorted([(json.dumps(x['metric'],sort_keys=True),x['value'][1]) for x in obj['data']['result']])
 return sorted(json.dumps(json.loads(x),sort_keys=True) for x in body.splitlines() if x.strip())
def main():
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument("--replica",choices=["01","02"]);options=parser.parse_args()
 instances=json.loads(subprocess.check_output(['terraform','output','-json'],cwd=ROOT/'terraform/oci-observability',text=True))['instances']['value']
 for service,name,params in QUERIES:
  port=8428 if service=='metrics' else 9428;path='/api/v1/query' if service=='metrics' else '/select/logsql/query'
  query=path+'?'+urllib.parse.urlencode(params)
  args=['kubectl','--kubeconfig',str(Path.home()/'.kube/oke.yaml'),'exec','-n','reventer-monitoring','deployment/victoria-'+service,'--','wget','-qO-',f'http://127.0.0.1:{port}'+query]
  source=normal(service,subprocess.check_output(args,text=True))
  print(name,'source aggregate:',source,flush=True)
  for instance in sorted(instances):
   if options.replica and not instance.endswith(options.replica):continue
   ip=instances[instance]['public_ip'];storage=18428 if service=='metrics' else 19428;start=time.monotonic()
   # url is constructed by urllib, shell quoted by shlex, contains no credentials.
   import shlex
   body=subprocess.check_output(['ssh',*SSH,'ubuntu@'+ip,'curl --fail --silent --show-error --max-time 120 '+shlex.quote(f'http://127.0.0.1:{storage}'+query)],text=True)
   result=normal(service,body);assert result==source,(instance,name,'historical aggregate mismatch',result)
   print(instance,name,'parity passed',round(time.monotonic()-start,2),'seconds',flush=True)
if __name__=='__main__':main()
