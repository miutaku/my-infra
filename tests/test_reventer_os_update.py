import mmap
import zipfile
import ast
import tempfile
import importlib.util
import io
import json
from pathlib import Path
import types
import unittest
from unittest.mock import patch, Mock
spec=importlib.util.spec_from_file_location('updater',Path(__file__).resolve().parents[1]/'observability/reventer/os-update/controller.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)

class Fake(m.Controller):
 def __init__(self,phase='idle',fail=None):
  self.cfg={'allow_paid_recovery':True};self.me='01';self.peer='02';self.run_id='test';self.state={'phase':phase};self.events=[];self.fail=fail
  self.block=types.SimpleNamespace(get_boot_volume_backup=lambda _:types.SimpleNamespace(data=types.SimpleNamespace(id='backup',freeform_tags={})),update_boot_volume_backup=lambda *_:None)
 def load(self):return self.state
 def save(self,**changes):self.state.update(changes)
 def acquire(self):self.events.append('lock');self.save(phase='checking',target=self.peer)
 def health(self,replica):
  self.events.append('health-'+replica)
  if self.fail=='preflight':raise m.Unsafe('stale canary')
  return True
 def prune_backups(self):pass
 def guest(self,action,**kw):
  self.events.append(action)
  if action=='status':return {'boot_id':'new' if 'upgrade' in self.events else 'old','pdc_running':False,'upgrade':{'state':'succeeded'}}
  return {}
 def backup(self):
  self.events.append('backup');self.save(phase='backup')
  if self.fail=='backup':raise m.Unsafe('backup failed')
  self.save(backup_id='backup')
 def validate(self):
  self.events.append('validate')
  if self.fail=='collection':raise m.Unsafe('logs stopped collecting')
 def rollback(self):
  self.events.append('restore-boot-volume');self.save(phase='blocked',result='rolled-back')

class UpdateTests(unittest.TestCase):
 def run_now(self,c):
  with patch.object(m,'poll',lambda fn,timeout=0:fn()):c.run()
 def environment_health(self,expected,metrics_env,logs_env):
  c=m.Controller.__new__(m.Controller);c.cfg={'environments':[expected]};c.me='01'
  def response(data):
   r=io.BytesIO(data);r.status=200;return r
  metrics={'data':{'result':[{'metric':{'env':metrics_env},'value':[0,str(m.utc().timestamp())]}]}}
  logs={'env':logs_env,'logs':'1'}
  c.http=Mock(side_effect=[response(b'OK'),response(b'OK'),response(json.dumps(metrics).encode()),response(json.dumps(logs).encode()+b'\n')])
  return c
 def test_stg_health_does_not_require_prd_data(self):
  self.assertTrue(self.environment_health('stg','stg','stg').health('01'))
 def test_foreign_metrics_canary_does_not_authorize_update(self):
  with self.assertRaises(m.Unsafe):self.environment_health('stg','prd','stg').health('01')
 def test_foreign_logs_canary_does_not_authorize_update(self):
  with self.assertRaises(m.Unsafe):self.environment_health('prd','prd','stg').health('01')
 def test_success_backs_up_before_upgrade(self):
  c=Fake();self.run_now(c)
  self.assertLess(c.events.index('backup'),c.events.index('upgrade'))
  self.assertEqual(c.state['phase'],'idle')
  self.assertNotIn('restore-boot-volume',c.events)
 def test_stale_real_collection_blocks_upgrade(self):
  c=Fake(fail='preflight')
  with self.assertRaises(m.Unsafe):self.run_now(c)
  self.assertNotIn('upgrade',c.events)
 def test_failed_backup_never_updates(self):
  c=Fake(fail='backup')
  with self.assertRaises(m.Unsafe):self.run_now(c)
  self.assertNotIn('upgrade',c.events)
  self.assertNotIn('restore-boot-volume',c.events)
 def test_collection_failure_restores_os_and_blocks_next_vm(self):
  c=Fake(fail='collection')
  with self.assertRaises(m.Unsafe):self.run_now(c)
  self.assertIn('restore-boot-volume',c.events)
  self.assertEqual(c.state['phase'],'blocked')
  c.events.clear()
  with self.assertRaises(m.Unsafe):self.run_now(c)
  self.assertNotIn('upgrade',c.events)
 def test_crash_resumes_recorded_rollback_only(self):
  c=Fake(phase='upgrading');c.state.update(target='02',backup_id='backup')
  self.run_now(c)
  self.assertEqual(c.events,['restore-boot-volume'])
 def test_concurrent_or_foreign_target_never_updates(self):
  c=Fake(phase='upgrading');c.state.update(target='01',backup_id='backup')
  with self.assertRaises(m.Unsafe):self.run_now(c)
  self.assertNotIn('upgrade',c.events)
 def test_cost_authorization_required_before_mutation(self):
  c=Fake();c.cfg['allow_paid_recovery']=False
  with self.assertRaises(m.Unsafe):self.run_now(c)
  self.assertEqual(c.events,[])
 def test_log_backfill_preserves_duplicate_multiplicity(self):
  row={'_stream':'{env="prd",pod="backend"}','_stream_id':'source','_time':'2026-10-06T00:00:00Z','_msg':'same'}
  target={**row,'_stream_id':'other'}
  self.assertEqual(m.missing_logs([row,row],[target]),[row])
  prepared,fields=m.prepare_log(row)
  self.assertEqual(fields,{'env','pod'});self.assertNotIn('_stream_id',prepared)
  self.assertEqual(prepared['env'],'prd')
 def test_log_batches_keep_distinct_stream_schemas(self):
  rows=[{"_stream":"{env=\"prd\"}","_time":"x","_msg":"a","pod":"ordinary"},{"_stream":"{env=\"prd\",pod=\"backend\"}","_time":"x","_msg":"b"}]
  batches=list(m.log_batches(rows));self.assertEqual([fields for _,fields in batches],[["env"],["env","pod"]])
  self.assertEqual(batches[0][0][0]["pod"],"ordinary")
 def test_stream_label_conflict_refused(self):
  with self.assertRaises(m.Unsafe):m.prepare_log({"_stream":"{env=\"prd\"}","env":"stg"})
 def test_invalid_log_stream_refused(self):
  with self.assertRaises(m.Unsafe):m.prepare_log({'_stream':'{env="prd",bad}','_time':'x'})

class SafetyGateTests(unittest.TestCase):
 def test_failed_apt_marker_does_not_wait_for_reboot_deadline(self):
  def failed():raise m.FailedUpdate('package update failed')
  with patch.object(m.time,'sleep') as sleep:
   with self.assertRaises(m.FailedUpdate):m.poll(failed,1800)
  sleep.assert_not_called()

 def test_health_200_without_collector_canaries_is_failure(self):
  c=m.Controller.__new__(m.Controller);c.cfg={}
  class Response(io.BytesIO):status=200
  c.http=lambda replica,service,path:Response(json.dumps({'data':{'result':[]}}).encode())
  with self.assertRaises(m.Unsafe):c.health('01')
 def test_future_canary_timestamp_is_failure(self):
  c=m.Controller.__new__(m.Controller);c.cfg={}
  class Response(io.BytesIO):status=200
  result=[{'metric':{'env':env},'value':[0,'999999999999']} for env in ['stg','prd']]
  c.http=lambda replica,service,path:Response(json.dumps({'data':{'result':result}}).encode())
  with self.assertRaises(m.Unsafe):c.health('01')
 def test_foreign_journal_owner_cannot_be_overwritten(self):
  c=m.Controller.__new__(m.Controller);c.cfg={'lock_instance_id':'lock'};c.state={'phase':'idle'}
  called=[]
  c.compute=types.SimpleNamespace(get_instance=lambda _:types.SimpleNamespace(data=types.SimpleNamespace(extended_metadata={m.STATE_KEY:{'phase':'upgrading','owner':'other'}}),headers={'etag':'new'}),update_instance=lambda *a,**kw:called.append(kw))
  with self.assertRaises(m.Unsafe):c.save(phase='checking')
  self.assertEqual(called,[])
 def test_nonjournal_etag_change_after_reboot_is_safe(self):
  c=m.Controller.__new__(m.Controller);c.cfg={'lock_instance_id':'lock'};c.state={'phase':'upgrading','owner':'mine'}
  called=[]
  c.compute=types.SimpleNamespace(get_instance=lambda _:types.SimpleNamespace(data=types.SimpleNamespace(extended_metadata={m.STATE_KEY:dict(c.state),'unrelated':'keep'}),headers={'etag':'post-reboot'}),update_instance=lambda *a,**kw:called.append((a,kw)))
  c.save(phase='validating')
  self.assertEqual(called[0][1]['if_match'],'post-reboot')
  self.assertEqual(called[0][0][1].extended_metadata['unrelated'],'keep')

class BootRecoveryTests(unittest.TestCase):
 def test_restored_boot_waits_for_guest_before_restarting_storage(self):
  c=m.Controller.__new__(m.Controller);c.cfg={};c.me='01';c.peer='02';c.state={}
  c.health=Mock(return_value=True);c.catch_up=Mock()
  ready=[False];events=[]
  def guest(action,**kw):
   events.append(action)
   if action=='status':
    if not ready[0]:ready[0]=True;raise m.Unsafe('SSH is still starting')
    return {'services':{x:'running' for x in m.SERVICES}}
   if action=='start-storage':self.assertTrue(ready[0])
   return {}
  c.guest=guest
  with patch.object(m.time,'sleep'):c.validate()
  self.assertEqual(events[:3],['status','status','start-storage'])
  self.assertEqual(events[-1],'activate');c.catch_up.assert_called_once()

 def test_restart_reuses_recorded_volume_and_preserves_failed_boot(self):
  c=m.Controller.__new__(m.Controller);c.cfg={}
  c.me='01';c.peer='02'
  c.cfg={'allow_paid_recovery':True,'nodes':{'02':{'id':'target'}}}
  c.state={'phase':'restoring','backup_id':'backup','recovery_volume_id':'restored'}
  c.health=Mock(return_value=True);c.validate=Mock()
  c.save=lambda **changes:c.state.update(changes)
  c.load=lambda:c.state
  attached=['failed']
  c.boot=lambda:attached[0]
  def replace(instance,details):
   self.assertEqual(instance,'target')
   self.assertEqual(details.source_details.boot_volume_id,'restored')
   self.assertTrue(details.source_details.is_preserve_boot_volume_enabled)
   attached[0]='restored'
  c.compute=types.SimpleNamespace(get_instance=lambda _:types.SimpleNamespace(data=types.SimpleNamespace(lifecycle_state='RUNNING')),update_instance=Mock(side_effect=replace))
  c.block=types.SimpleNamespace(get_boot_volume=lambda _:types.SimpleNamespace(data=types.SimpleNamespace(lifecycle_state='AVAILABLE')),create_boot_volume=Mock(),get_boot_volume_backup=lambda _:types.SimpleNamespace(data=types.SimpleNamespace(id='backup',freeform_tags={})),update_boot_volume_backup=Mock())
  with patch.object(m,'poll',side_effect=lambda fn,timeout=0:self.assertTrue(fn())):c.rollback()
  c.block.create_boot_volume.assert_not_called()
  c.health.assert_called_once_with('01');c.validate.assert_called_once()
  self.assertEqual(c.state['result'],'rolled-back')
  c.compute.update_instance.assert_called_once()
  self.assertEqual(c.block.update_boot_volume_backup.call_args.args[1].freeform_tags['verified'],'true')

class InstallerTests(unittest.TestCase):
 def test_sdk_redeployment_keeps_existing_native_mapping_intact(self):
  source=Path(__file__).resolve().parents[1]/'scripts/deploy-reventer-os-update.py'
  tree=ast.parse(source.read_text())
  node=next(n for n in ast.walk(tree) if isinstance(n,ast.Assign) and any(isinstance(x,ast.Name) and x.id=='installer' for x in n.targets))
  code=ast.literal_eval(node.value).split("<<'INSTALL'\n",1)[1].split("\nINSTALL",1)[0]
  with tempfile.TemporaryDirectory() as tmp:
   root=Path(tmp)/'deps';root.mkdir();native=root/'native.so';native.write_bytes(b'old library bytes')
   wheels=Path(tmp)/'wheels';wheels.mkdir()
   with zipfile.ZipFile(wheels/'test.whl','w') as z:z.writestr('native.so',b'new library bytes')
   with native.open('rb') as f,mmap.mmap(f.fileno(),0,access=mmap.ACCESS_READ) as mapped:
    exec(compile(code.replace('/opt/reventer-os-update/deps',str(root)).replace('/tmp/reventer-os-update-stage/wheels',str(wheels)),'sdk-install.py','exec'),{})
    self.assertEqual(mapped[:],b'old library bytes')
    self.assertEqual(native.read_bytes(),b'new library bytes')

 def test_generated_authorization_helper_preserves_real_newlines(self):
  source=Path(__file__).resolve().parents[1]/'scripts/deploy-reventer-os-update.py'
  tree=ast.parse(source.read_text())
  node=next(n for n in ast.walk(tree) if isinstance(n,ast.Assign) and any(isinstance(x,ast.Name) and x.id=='code' for x in n.targets))
  code=ast.literal_eval(node.value)
  with tempfile.TemporaryDirectory() as tmp:
   path=Path(tmp)/'keys';path.write_text('admin-key\nold reventer-peer-os-update\n')
   with patch('sys.stdin',io.StringIO('new reventer-peer-os-update\n')):exec(compile(code.replace('/home/ubuntu/.ssh/authorized_keys',str(path)),'authorize.py','exec'),{})
   self.assertEqual(path.read_text(),'admin-key\nnew reventer-peer-os-update\n')

class GuestStatusTests(unittest.TestCase):
 def test_metrics_stream_accepts_no_content_and_rejects_errors(self):
  spec=importlib.util.spec_from_file_location('guest',Path(__file__).resolve().parents[1]/'observability/reventer/os-update/guest.py')
  guest=importlib.util.module_from_spec(spec);spec.loader.exec_module(guest)
  for status in [200,204,500]:
   with self.subTest(status=status):
    connection=Mock();connection.getresponse.return_value=types.SimpleNamespace(status=status,read=lambda:b'')
    source=io.BytesIO(b'{}\n')
    with patch.object(guest.http.client,'HTTPConnection',return_value=connection),patch.object(guest.sys,'stdin',types.SimpleNamespace(buffer=source)):
     if status==500:
      with self.assertRaises(AssertionError):guest.upload('/api/v1/import')
     else:guest.upload('/api/v1/import')
    self.assertIs(connection.request.call_args.kwargs['body'],source)
    self.assertTrue(connection.request.call_args.kwargs['encode_chunked'])

 def test_logs_import_uses_ndjson_content_type(self):
  spec=importlib.util.spec_from_file_location("guest",Path(__file__).resolve().parents[1]/"observability/reventer/os-update/guest.py")
  guest=importlib.util.module_from_spec(spec);spec.loader.exec_module(guest)
  response=Mock();response.__enter__=Mock(return_value=types.SimpleNamespace(status=200));response.__exit__=Mock(return_value=False)
  request={"action":"import-logs","records":[{"_time":"x","_msg":"message","env":"prd"}],"fields":["env"]}
  with patch.object(guest.os,"geteuid",return_value=0),patch.object(guest.sys,"stdin",types.SimpleNamespace(buffer=io.BytesIO((json.dumps(request)+"\n").encode()))),patch.object(guest.sys,"stdout",io.StringIO()),patch.object(guest.urllib.request,"urlopen",return_value=response) as opening:
   guest.main()
  sent=opening.call_args.args[0];self.assertEqual(sent.get_header("Content-type"),"application/stream+json")
  self.assertEqual(json.loads(sent.data),request["records"][0])

 def check_format(self,array):
  spec=importlib.util.spec_from_file_location('guest',Path(__file__).resolve().parents[1]/'observability/reventer/os-update/guest.py')
  guest=importlib.util.module_from_spec(spec);spec.loader.exec_module(guest)
  rows=[{'Service':'metrics','State':'running','Command':'metrics'},{'Service':'pdc','State':'running','Command':'test-pdc-credential'}]
  raw=json.dumps(rows) if array else '\n'.join(json.dumps(x) for x in rows)
  calls=[];output=io.StringIO()
  with patch.object(guest.os,'geteuid',return_value=0),patch.object(guest,'compose',side_effect=lambda *a:(calls.append(a) or raw)),patch.object(guest,'run',return_value='kernel'),patch.object(guest,'MARKER',types.SimpleNamespace(exists=lambda:False)),patch.object(guest.sys,'stdin',types.SimpleNamespace(buffer=io.BytesIO(b'{"action":"status"}\n'))),patch.object(guest.sys,'stdout',output):
   guest.main()
  value=json.loads(output.getvalue())
  self.assertTrue(value['pdc_running'])
  self.assertEqual(calls[0][:2],('--profile','grafana'))
  self.assertNotIn('test-pdc-credential',output.getvalue())
 def test_array_ps_keeps_pdc_state_and_filters_credentials(self):self.check_format(True)
 def test_jsonlines_ps_keeps_pdc_state_and_filters_credentials(self):self.check_format(False)

if __name__=='__main__':unittest.main()

class FailureDiagnosticTests(unittest.TestCase):
 def test_provider_diagnostic_drops_sensitive_messages(self):
  exc=RuntimeError('Authorization: bearer secret');exc.status=401;exc.code='NotAuthenticated';exc.headers={'Authorization':'secret'}
  self.assertEqual(m.error_summary(exc),{'type':'RuntimeError','status':401,'code':'NotAuthenticated'})
 def test_failed_update_records_safe_invariant(self):
  c=Fake(fail='collection')
  with patch.object(m,'poll',lambda fn,timeout=0:fn()):
   with self.assertRaises(m.Unsafe):c.run()
  self.assertEqual(c.state['failure']['invariant'],'logs stopped collecting')
 def test_poll_records_failure_without_provider_payload(self):
  exc=RuntimeError('signed request');fn=Mock(side_effect=[exc,True])
  with patch.object(m.time,'sleep'),patch('builtins.print') as output:self.assertTrue(m.poll(fn))
  self.assertNotIn('signed request',str(output.call_args))

class FailedRestoreAvailabilityTests(unittest.TestCase):
 def controller(self,boot):
  c=Fake(fail='collection');c.boot=Mock(return_value=boot)
  def backup():c.save(phase='backup',backup_id='backup',boot_volume_id='original')
  c.backup=backup;c.rollback=Mock(side_effect=m.Unsafe('restore API unavailable'))
  return c
 def test_failed_restore_restarts_unchanged_boot_without_pdc(self):
  c=self.controller('original')
  with patch.object(m,'poll',lambda fn,timeout=0:fn()):
   with self.assertRaises(m.Unsafe):c.run()
  self.assertIn('start-storage',c.events);self.assertNotIn('activate',c.events)
  self.assertEqual(c.state['phase'],'blocked');self.assertEqual(c.state['recovery_failure']['invariant'],'restore API unavailable')
 def test_changed_boot_is_not_activated_after_failed_restore(self):
  c=self.controller('replacement')
  with patch.object(m,'poll',lambda fn,timeout=0:fn()):
   with self.assertRaises(m.Unsafe):c.run()
  self.assertNotIn('start-storage',c.events);self.assertNotIn('activate',c.events)

class DiagnosticPersistenceTests(unittest.TestCase):
 def test_failed_diagnostic_write_does_not_skip_rollback(self):
  c=Fake(fail='collection');save=c.save
  def fail_diagnostic(**changes):
   if 'failure' in changes:raise RuntimeError('journal temporarily unavailable')
   save(**changes)
  c.save=fail_diagnostic
  with patch.object(m,'poll',lambda fn,timeout=0:fn()):
   with self.assertRaises(m.Unsafe):c.run()
  self.assertIn('restore-boot-volume',c.events)

class ReadinessDeadlineTests(unittest.TestCase):
 def test_timeout_retains_safe_last_cause(self):
  exc=RuntimeError('private signed payload');exc.status=503;exc.code='Unavailable'
  with patch.object(m.time,'monotonic',side_effect=[0,0,2]),patch.object(m.time,'sleep'),patch('builtins.print'):
   with self.assertRaises(m.Unsafe) as result:m.poll(Mock(side_effect=exc),1)
  self.assertIn('503',str(result.exception));self.assertIn('Unavailable',str(result.exception))
  self.assertNotIn('private signed payload',str(result.exception))

class JournalRetryTests(unittest.TestCase):
 def controller(self,observations,errors):
  c=m.Controller.__new__(m.Controller);c.cfg={'lock_instance_id':'lock'};c.state={'phase':'checking','owner':'mine'}
  responses=[types.SimpleNamespace(data=types.SimpleNamespace(extended_metadata={m.STATE_KEY:x,'other':'preserve'}),headers={'etag':str(n)}) for n,x in enumerate(observations)]
  c.compute=types.SimpleNamespace(get_instance=Mock(side_effect=responses),update_instance=Mock(side_effect=errors))
  return c
 def test_conflict_and_throttle_retry_with_fresh_etag(self):
  state={'phase':'checking','owner':'mine'}
  c=self.controller([state,state,state],[m.oci.exceptions.ServiceError(409,'Conflict',{},'sensitive'),m.oci.exceptions.ServiceError(429,'TooManyRequests',{},'sensitive'),None])
  with patch.object(m.time,'sleep'):c.save(phase='backup')
  self.assertEqual([x.kwargs['if_match'] for x in c.compute.update_instance.call_args_list],['0','1','2'])
  self.assertEqual(c.state['phase'],'backup');self.assertEqual(c.metadata['other'],'preserve')
 def test_other_owner_acquiring_during_retry_is_never_overwritten(self):
  c=self.controller([{'phase':'checking','owner':'mine'},{'phase':'checking','owner':'other'}],[m.oci.exceptions.ServiceError(412,'NoEtagMatch',{},'sensitive')])
  with patch.object(m.time,'sleep'):
   with self.assertRaises(m.Unsafe):c.save(phase='backup')
  self.assertEqual(c.compute.update_instance.call_count,1)
 def test_authorization_error_is_not_retried(self):
  c=self.controller([{'phase':'checking','owner':'mine'}],[m.oci.exceptions.ServiceError(403,'NotAuthorizedOrNotFound',{},'sensitive')])
  with patch.object(m.time,'sleep') as sleep:
   with self.assertRaises(m.oci.exceptions.ServiceError):c.save(phase='backup')
  sleep.assert_not_called()
 def test_committed_write_with_lost_response_is_recognized(self):
  state={'phase':'checking','owner':'mine'};updated={**state,'phase':'backup','updated_at':'fixed'}
  c=self.controller([state,updated],[m.oci.exceptions.ServiceError(503,'Unavailable',{},'sensitive')])
  with patch.object(m,'stamp',return_value='fixed'),patch.object(m.time,'sleep'):c.save(phase='backup')
  self.assertEqual(c.compute.update_instance.call_count,1);self.assertEqual(c.state,updated)

class FailedRestoreJournalTests(unittest.TestCase):
 def test_unavailable_journal_does_not_skip_original_storage_restart(self):
  c=Fake(fail='collection');c.boot=Mock(return_value='original')
  c.backup=lambda:c.save(phase='backup',backup_id='backup',boot_volume_id='original')
  c.rollback=Mock(side_effect=m.Unsafe('restore unavailable'));save=c.save
  def unavailable(**changes):
   if changes.get('result')=='recovery-failed':raise RuntimeError('metadata unavailable')
   save(**changes)
  c.save=unavailable
  with patch.object(m,'poll',lambda fn,timeout=0:fn()):
   with self.assertRaises(RuntimeError):c.run()
  self.assertIn('start-storage',c.events);self.assertNotIn('activate',c.events)
  self.assertNotEqual(c.state['phase'],'idle')
