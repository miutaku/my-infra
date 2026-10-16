import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parse} from 'yaml';
const model=JSON.parse(readFileSync('model.json','utf8'));
const manifest=JSON.parse(readFileSync('dist/view-manifest.json','utf8'));
const relation=(source,target,kind)=>Object.values(model.relations).some(r=>r.source.model===source&&r.target.model===target&&r.kind===kind);
const hasEdge=(view,source,target)=>model.views[view].edges.some(e=>e.source===source&&e.target===target);
test('overview has one PVE cluster containing Talos, both distinct NAS VMs and PBS, with only summary links',()=>{
 const view=model.views.index;
 for(const ref of ['homeSite.pve.x570.cp1','homeSite.pve.x570.worker1','homeSite.pve.b550m.cp2','homeSite.pve.b550m.cp3','homeSite.pve.b550m.worker2','homeSite.pve.x570.nas1','homeSite.pve.b550m.nas2','homeSite.pve.x570.pbs']){
  assert.equal(view.nodes.find(n=>n.id===ref)?.parent,'homeSite.pve',ref);
 }
 assert.ok(!view.nodes.some(n=>['homeSite.pve.x570','homeSite.pve.b550m','homeSite.talos'].includes(n.id)));
 assert.equal(view.edges.length,6);
 assert.ok(!view.edges.some(e=>['host','member','connect','observe','query'].includes(e.kind)));
 assert.ok(!view.nodes.some(n=>n.modelRef==='external.grafana'));
 assert.equal(model.elements['external.idrive'].title,'IDrive e2（S3互換）');
});
test('services, their databases and operation controllers belong inside home-k8s rather than connect through hosting arrows',()=>{
 for(const ref of ['premises.home.nextcloud','premises.home.recording','premises.home.databases','premises.home.management','premises.home.platform','premises.home.eso','premises.home.agent'])assert.equal(model.views.home_apps.nodes.find(n=>n.id===ref)?.parent,'premises.home',ref);
 assert.ok(!Object.values(model.relations).some(r=>['host','member'].includes(r.kind)));
 assert.ok(model.views.home_apps.edges.length<=5);
 for(const name of ['flannel','kube_proxy','cluster_dns','metrics_server','cert_approver','descheduler']){
  const ref=`premises.home.platform.${name}`;
  assert.ok(model.views.platform.edges.some(e=>e.source===ref||e.target===ref),ref);
 }
});
test('drill-down reaches services and a single complete PVE inventory, with Docker nested inside meaningful CTs',()=>{
 for(const [ref,view] of [['premises.home.nextcloud','nextcloud'],['premises.home.recording','recording'],['premises.home.apps.loockit','loockit'],['premises.home.platform','platform']])assert.equal(manifest.home_apps.deploymentNavigation[ref],view);
 for(const [host,ref]of [['x570','loockit_a'],['b550m','loockit_b']]){
  const ct=model.deployments.elements[`homeSite.pve.${host}.loockit`];
  assert.match(ct.title,/Loockit/);
  assert.equal(model.deployments.elements[`homeSite.pve.${host}.loockit.app`].kind,'workload');
  assert.ok(Object.values(model.deployments.elements).some(n=>n.id.startsWith(`homeSite.pve.${host}.loockit.app.`)&&n.element===`premises.pve.${ref}`));
 }
 for(const view of ['pve_x570','pve_b550m','coupon'])assert.ok(!model.views[view],view);
 assert.ok(!Object.values(model.deployments.elements).some(n=>/^LXC CT\d+$/.test(n.title??'')));
});
test('Loockit proxy checks readiness while its LXC backends own Kubernetes Lease and Bluetooth access',()=>{
 const proxy='premises.home.apps.loockit.proxy',api='premises.home.platform.api';
 for(const [node,ble]of [['loockit_a','x570.bluez'],['loockit_b','b550m.bluez']]){
  assert.ok(relation(proxy,`premises.pve.${node}`,'runtime'));
  assert.ok(relation(`premises.pve.${node}`,api,'runtime'));
  assert.ok(relation(`premises.pve.${node}`,`premises.pve.${ble}`,'runtime'));
 }
 assert.ok(!relation(proxy,api,'runtime'));
});
test('TNLaStation PRD and STG each use their own tuner and DB as declared in Kustomize',()=>{
 const base=parse(readFileSync('../../k8s/pve/tnlastation/configmap.yaml','utf8'));
 const stg=parse(readFileSync('../../k8s/pve/tnlastation-staging/kustomization.yaml','utf8'));
 assert.match(base.data['config.yml'],/mirakurun\.app-mirakurun\.svc/);
 assert.ok(stg.configMapGenerator[0].literals.some(l=>l.includes('mirakurun.app-mirakurun-staging.svc')));
 for(const [app,tuner,db]of [['tnlastation','mirakurun','postgres'],['tnlastation_staging','mirakurun_staging','postgres_staging']]){
  const source=`premises.home.recording.${app}`,target=`premises.home.recording.${tuner}`;
  assert.ok(relation(source+'.backend',target,'runtime'));
  assert.ok(hasEdge('recording',source,target));
  assert.ok(relation(source+'.backend',`premises.home.databases.${db}`,'runtime'));
 }
 assert.ok(!relation('premises.home.recording.tnlastation.backend','premises.home.recording.mirakurun_staging','runtime'));
 assert.ok(!relation('premises.home.recording.tnlastation_staging.backend','premises.home.recording.mirakurun','runtime'));
});
test('NUT Pi identities and cross-power monitoring match both Ansible host_vars, with UniFi managing the switch',()=>{
 for(const [suffix,ref]of [['112','pi_a'],['113','pi_b']]){
  const ip=`192.168.10.${suffix}`,config=parse(readFileSync(`../../ansible/nut/host_vars/${ip}.yml`,'utf8'));
  const element=model.elements[`premises.hardware.ups.${ref}`];
  assert.equal(config.nut_listen_ip,ip);
  assert.ok(element.title.includes(ip));
  assert.ok(element.description.txt.includes(config.nut_power_monitor.ups));
  for(const daemon of ['upsd','usbhid-ups','upsmon'])assert.ok(element.description.txt.includes(daemon));
 }
 assert.ok(relation('premises.pve.unifi','premises.hardware.network.switch','admin'));
 assert.ok(!relation('premises.hardware.network.switch','premises.pve.unifi','admin'));
 for(const node of Object.values(model.elements))assert.ok(!/未確定|未確認|固定配置を意味しない/.test((node.title??'')+' '+(node.description?.txt??'')),node.id);
});
