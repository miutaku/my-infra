import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {deploymentTarget} from '../scripts/relationship-navigation.mjs';
const model=JSON.parse(readFileSync('model.json','utf8'));
const runtime=JSON.parse(readFileSync('evidence/home-k8s-runtime.json','utf8'));
const pve=JSON.parse(readFileSync('evidence/pve-runtime.json','utf8'));

test('recorded live Applications and workload controllers are accounted for including bootstrap',()=>{
 assert.equal(runtime.missingApplicationDefinitions.length,0);
 assert.equal(runtime.unmapped.length,0);
 for(const row of [...runtime.applications,...runtime.workloads])assert.ok(model.elements[row.modelRef],`${row.namespace}/${row.name}: ${row.modelRef}`);
 for(const ref of ['flannel','kube_proxy','cluster_dns','metrics_server','cert_approver']){
  const id=`premises.home.platform.${ref}`;
  assert.ok(runtime.workloads.some(w=>w.modelRef===id));
  assert.ok(model.views.platform.nodes.some(n=>n.modelRef===id));
 }
 assert.notEqual('premises.home.platform.cluster_dns','premises.home.dns.coredns');
});
test('recorded running Proxmox guests are represented under their actual host with NIC tags',()=>{
 for(const host of pve.hosts)for(const guest of host.guests){
  const node=Object.values(model.deployments.elements).find(n=>n.metadata?.vmId===String(guest.id));
  assert.ok(node,`Missing running guest ${host.name}/${guest.id}`);
  assert.ok(node.id.startsWith(`homeSite.${host.name.replace('pve-','')}.`));
  assert.equal(node.metadata.vlan,String(guest.network[0].tag??'native1'));
 }
});
test('Talos OS is nested in each VM or RPi and membership targets a multi-host cluster',()=>{
 const members=[['x570','cp1'],['x570','worker1'],['b550m','cp2'],['b550m','cp3'],['b550m','worker2']];
 for(const [host,vm] of members){
  const ref=`homeSite.${host}.${vm}.talos`;
  assert.equal(model.deployments.elements[ref].kind,'os');
  assert.ok(model.views[`pve_${host}`].nodes.some(n=>n.id===ref&&n.parent===`homeSite.${host}.${vm}`));
 }
 assert.equal(model.deployments.elements['homeSite.worker_pi1.talos'].kind,'os');
 assert.equal(model.deployments.elements['homeSite.worker_pi2.talos'].kind,'os');
 assert.equal(model.views.placement.edges.filter(e=>e.kind==='member').length,4); // 2 PVE hosts + 2 RPis
 assert.equal(deploymentTarget('homeSite.x570'),'pve_x570');
 assert.equal(JSON.parse(readFileSync('dist/view-manifest.json','utf8')).placement.deploymentNavigation['homeSite.x570'],'pve_x570');
});
test('physical network and VLAN details retain switches, AP, tagged PVE guests and isolated guest VLAN',()=>{
 const refs=model.views.network.nodes.map(n=>n.modelRef);
 for(const ref of ['premises.hardware.network.router','premises.hardware.network.switch','premises.hardware.network.ap','premises.hardware.x570.bridge','premises.hardware.b550m.bridge'])assert.ok(refs.includes(ref),ref);
 assert.equal(JSON.parse(readFileSync('dist/view-manifest.json','utf8')).placement.deploymentNavigation['homeSite.network'],'network');
 assert.equal(model.views.network.nodes.find(n=>n.modelRef==='premises.lan').navigateTo,'vlans');
 assert.ok(Object.values(model.relations).some(r=>r.source.model==='premises.hardware.b550m.bridge'&&r.target.model==='premises.lan.iot'&&r.title.includes('40')));
 assert.ok(model.elements['premises.lan.guest'].description.txt.includes('不可'));
});
