import subprocess,json,datetime
remote=r'''
import subprocess,json,socket,re
host=socket.gethostname(); guests=[]
for kind in ['qemu','lxc']:
 for vm in json.loads(subprocess.check_output(['pvesh','get',f'/nodes/{host}/{kind}','--output-format','json'])):
  if vm.get('template'):continue
  c=json.loads(subprocess.check_output(['pvesh','get',f'/nodes/{host}/{kind}/{vm["vmid"]}/config','--output-format','json']))
  nets=[]
  for k,v in c.items():
   if not re.fullmatch('net[0-9]+',k):continue
   opts=dict(x.split('=',1) for x in v.split(',') if '=' in x)
   nets.append({'interface':k,'bridge':opts.get('bridge'),'tag':int(opts['tag']) if 'tag'in opts else None})
  guests.append({'id':vm['vmid'],'name':vm.get('name'),'kind':kind,'status':vm['status'],'network':nets})
print(json.dumps({'name':host,'guests':guests}))
'''
rows=[]
for ip in ['192.168.0.115','192.168.0.119']:
 out=subprocess.check_output(['ssh','-o','BatchMode=yes','-o','StrictHostKeyChecking=yes','root@'+ip,'python3 -'],input=remote.encode())
 rows.append(json.loads(out))
json.dump({'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'hosts':rows},open('evidence/pve-runtime.json','w'),ensure_ascii=False,indent=2)
print([(r['name'],len(r['guests'])) for r in rows])
