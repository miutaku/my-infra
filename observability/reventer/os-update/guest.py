#!/usr/bin/env python3
"""Forced SSH command: fixed maintenance verbs, never arbitrary shell input."""
import http.client
import json
import os
from pathlib import Path
import subprocess
import sys
import urllib.parse
import urllib.request
ROOT=Path('/opt/reventer-observability')
MARKER=Path('/var/lib/reventer-os-update/upgrade.json')
SERVICES=['metrics','logs','metrics-query','logs-query','tunnel']
def run(argv):
 r=subprocess.run(argv,cwd=ROOT,capture_output=True,text=True,timeout=180)
 if r.returncode:raise RuntimeError('maintenance command failed; inspect local journal')
 return r.stdout

def compose(*args):return run(['docker','compose',*args])
def stream(path,port=18428):
 with urllib.request.urlopen(f'http://127.0.0.1:{port}'+path,timeout=180) as r:
  while chunk:=r.read(65536):sys.stdout.buffer.write(chunk)

def upload(path):
 c=http.client.HTTPConnection('127.0.0.1',18428,timeout=180)
 c.request('POST',path,body=sys.stdin.buffer,headers={'Content-Type':'application/json'},encode_chunked=True)
 r=c.getresponse();r.read();assert r.status==200,'metrics import failed'

def main():
 assert os.geteuid()==0
 line=sys.stdin.buffer.readline(8*1024*1024)
 assert line.endswith(b'\n'),'request is too large'
 request=json.loads(line);action=request['action']
 if action=='status':
  raw=compose('--profile','grafana','ps','--all','--format','json')
  try:
   rows=json.loads(raw) if raw.strip() else []
   if isinstance(rows,dict):rows=[rows]
  except json.JSONDecodeError:
   rows=[json.loads(x) for x in raw.splitlines() if x]
  result={'boot_id':Path('/proc/sys/kernel/random/boot_id').read_text().strip(),'kernel':run(['uname','-r']).strip(),'pdc_running':any(x['Service']=='pdc' and x['State']=='running' for x in rows),'upgrade':json.loads(MARKER.read_text()) if MARKER.exists() else {},'services':{x['Service']:x['State'] for x in rows}}
 elif action=='prepare':
  # Disable boot activation before snapshot. Both normal and restored boots
  # remain outside PDC until history has caught up and validation has passed.
  run(['systemctl','disable','reventer-observability.service'])
  compose('--profile','grafana','stop');run(['sync']);result={'stopped':True}
 elif action=='upgrade':
  MARKER.parent.mkdir(mode=0o700,exist_ok=True)
  MARKER.write_text(json.dumps({'state':'scheduled'}))
  run(['systemd-run','--unit=reventer-os-upgrade','--collect','/usr/local/sbin/reventer-os-upgrade'])
  result={'scheduled':True}
 elif action=='start-storage':
  compose('up','-d',*SERVICES);result={'started':True}
 elif action=='activate':
  if request.get('pdc'):compose('--profile','grafana','up','-d','pdc')
  run(['systemctl','enable','reventer-observability.service']);result={'activated':True}
 elif action=='export-logs':
  stream('/select/logsql/query?'+urllib.parse.urlencode({'query':'* _time:['+request['start']+','+request['end']+')'}),19428);return
 elif action=='import-logs':
  data=request['records'];assert len(data)<=10000
  path='/insert/jsonline?'+urllib.parse.urlencode({'_stream_fields':','.join(request['fields'])})
  payload=b''.join((json.dumps(x,separators=(',',':'))+'\n').encode() for x in data)
  with urllib.request.urlopen('http://127.0.0.1:19428'+path,data=payload,timeout=180) as r:assert r.status==200
  result={'imported':len(data)}
 elif action=='import-metrics':upload('/api/v1/import');result={'imported':True}
 else:raise ValueError('unsupported maintenance verb')
 print(json.dumps(result))
if __name__=='__main__':
 try:main()
 except Exception:
  print('Maintenance failed; inspect local journal',file=sys.stderr);sys.exit(1)
