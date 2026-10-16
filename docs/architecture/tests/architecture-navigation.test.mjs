import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const model=JSON.parse(readFileSync('model.json','utf8'));
const manifest=JSON.parse(readFileSync('dist/view-manifest.json','utf8'));
function relation(source,target,kind){return Object.values(model.relations).some(r=>r.source.model===source&&r.target.model===target&&r.kind===kind);}
test('overview shows physical execution, storage and outside dependencies together',()=>{
 const refs=model.views.index.nodes.map(n=>n.modelRef);
 for(const ref of ['premises.hardware.network','premises.hardware.x570','premises.hardware.b550m','premises.hardware.rpi_workers','premises.home','premises.data.nas','premises.data.pbs','external.edge','external.bws','external.idrive','external.grafana'])assert.ok(refs.includes(ref),ref);
 for(const kind of ['host','network','runtime','backup','secret'])assert.ok(model.views.index.edges.some(e=>e.kind===kind),kind);
});
test('service overview keeps communication dependencies for every shown application',()=>{
 for(const ref of ['premises.home.nextcloud','premises.home.recording','premises.home.apps.loockit','premises.home.apps.coupon_manager','premises.home.apps.magic_mirror','premises.home.apps.wol','premises.home.apps.annict_scraper']){
  assert.ok(model.views.home_apps.edges.some(e=>e.kind==='runtime'&&(e.source===ref||e.target===ref)),`${ref} must have a communication connection, not only a hosting edge`);
 }
 for(const name of ['flannel','kube_proxy','cluster_dns','metrics_server','cert_approver','descheduler']){
  const ref=`premises.home.platform.${name}`;
  assert.ok(model.views.platform.edges.some(e=>e.source===ref||e.target===ref),ref);
 }
});
test('drill-down reaches service internals, and physical guests show meaningful names and Docker containment',()=>{
 for(const [ref,view] of [['premises.home.nextcloud','nextcloud'],['premises.home.recording','recording'],['premises.home.apps.loockit','loockit'],['premises.home.apps.coupon_manager','coupon'],['premises.home.platform','platform']])assert.equal(manifest.home_apps.deploymentNavigation[ref],view);
 for(const [host,ref]of [['x570','loockit_a'],['b550m','loockit_b']]){
  const ct=model.deployments.elements[`homeSite.${host}.loockit`];
  assert.match(ct.title,/Loockit/);
  assert.equal(model.deployments.elements[`homeSite.${host}.loockit.app`].kind,'workload');
  assert.ok(Object.values(model.deployments.elements).some(n=>n.id.startsWith(`homeSite.${host}.loockit.app.`)&&n.element===`premises.hardware.${ref}`));
 }
 assert.ok(!Object.values(model.deployments.elements).some(n=>/^LXC CT\d+$/.test(n.title??'')));
});
test('Loockit proxy checks readiness while its LXC backends own Kubernetes Lease and Bluetooth access',()=>{
 const proxy='premises.home.apps.loockit.proxy',api='premises.home.platform.api';
 for(const [node,ble]of [['loockit_a','ble_a'],['loockit_b','ble_b']]){
  assert.ok(relation(proxy,`premises.hardware.${node}`,'runtime'));
  assert.ok(relation(`premises.hardware.${node}`,api,'runtime'));
  assert.ok(relation(`premises.hardware.${node}`,`premises.hardware.${ble}`,'runtime'));
 }
 assert.ok(!relation(proxy,api,'runtime'));
});
