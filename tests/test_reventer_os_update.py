import importlib.util
import io
import json
from pathlib import Path
import types
import unittest
from unittest.mock import patch
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
 def test_invalid_log_stream_refused(self):
  with self.assertRaises(m.Unsafe):m.prepare_log({'_stream':'{env="prd",bad}','_time':'x'})

class SafetyGateTests(unittest.TestCase):
 def test_health_200_without_collector_canaries_is_failure(self):
  c=m.Controller.__new__(m.Controller)
  class Response(io.BytesIO):status=200
  c.http=lambda replica,service,path:Response(json.dumps({'data':{'result':[]}}).encode())
  with self.assertRaises(m.Unsafe):c.health('01')
 def test_future_canary_timestamp_is_failure(self):
  c=m.Controller.__new__(m.Controller)
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

class GuestStatusTests(unittest.TestCase):
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
