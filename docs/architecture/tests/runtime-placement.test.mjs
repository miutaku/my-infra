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
  assert.ok(node.id.startsWith(`homeSite.pve.${host.name.replace('pve-','')}.`));
  assert.equal(node.metadata.vlan,String(guest.network[0].tag??'native1'));
 }
});
test('one PVE view contains every VM and LXC, with Talos nested in each VM and no cluster-membership arrows',()=>{
 const members=[['x570','cp1'],['x570','worker1'],['b550m','cp2'],['b550m','cp3'],['b550m','worker2']];
 for(const [host,vm] of members){
  const ref=`homeSite.pve.${host}.${vm}.talos`;
  assert.equal(model.deployments.elements[ref].kind,'os');
  assert.ok(model.views.placement.nodes.some(n=>n.id===ref&&n.parent===`homeSite.pve.${host}.${vm}`));
 }
 for(const kind of ['vm','container']){
  const guests=Object.values(model.deployments.elements).filter(n=>n.kind===kind);
  for(const guest of guests){
   const node=model.views.placement.nodes.find(n=>n.id===guest.id);
   assert.ok(node,guest.id);assert.equal(node.parent,'homeSite.pve.'+guest.metadata.host.replace('pve-',''));assert.equal(model.views.placement.nodes.find(n=>n.id===node.parent).parent,'homeSite.pve');
   assert.ok(node.title.includes(guest.metadata.vlan==='native1'?'native1':'VLAN'+guest.metadata.vlan));
  }
 }
 assert.equal(model.deployments.elements['homeSite.worker_pi1.talos'].kind,'os');
 assert.equal(model.deployments.elements['homeSite.worker_pi2.talos'].kind,'os');
 assert.equal(model.views.placement.edges.length,0);
 assert.ok(!model.views.placement.nodes.some(n=>n.id==='homeSite.talos'));
 assert.equal(deploymentTarget('homeSite.pve'),'placement');
 assert.equal(JSON.parse(readFileSync('dist/view-manifest.json','utf8')).index.deploymentNavigation['homeSite.pve'],'placement');
});
test('physical network and VLAN details retain switches, AP, tagged PVE guests and isolated guest VLAN',()=>{
 const refs=model.views.network.nodes.map(n=>n.modelRef);
 for(const ref of ['premises.hardware.network.router','premises.hardware.network.switch','premises.hardware.network.ap','premises.pve.x570.bridge','premises.pve.b550m.bridge'])assert.ok(refs.includes(ref),ref);
 assert.equal(JSON.parse(readFileSync('dist/view-manifest.json','utf8')).index.deploymentNavigation['homeSite.network'],'network');
 assert.ok(!model.views.network.nodes.some(n=>n.modelRef==='premises.lan'));
 assert.equal(model.views.network.nodes.find(n=>n.modelRef==='premises.hardware.network.router').navigateTo,'vlans');
 assert.ok(Object.values(model.relations).some(r=>r.source.model==='premises.pve.b550m.bridge'&&r.target.model==='premises.lan.iot'&&r.title.includes('40')));
 assert.ok(model.elements['premises.lan.guest'].description.txt.includes('不可'));
});

test('generated containment layout fits the viewport without adding architectural connections',()=>{
 const compiled=JSON.parse(readFileSync('.likec4/placement.likec4.snap','utf8'));
 assert.equal(compiled.edges.length,0);
 assert.ok(compiled.bounds.width/compiled.bounds.height<3.5);
 assert.equal(compiled.nodes.length,model.views.placement.nodes.length);
 const overview=JSON.parse(readFileSync('.likec4/index.likec4.snap','utf8'));
 assert.equal(overview.edges.length,model.views.index.edges.length);
 for(const view of [compiled,overview]){
  const nodes=new Map(view.nodes.map(n=>[n.id,n]));
  for(const node of view.nodes){
   if(node.parent){const parent=nodes.get(node.parent);assert.ok(node.x>=parent.x&&node.y>=parent.y&&node.x+node.width<=parent.x+parent.width&&node.y+node.height<=parent.y+parent.height,node.id);}
   for(const other of view.nodes){
    if(node.id===other.id||node.parent!==other.parent)continue;
    assert.ok(node.x+node.width<=other.x||other.x+other.width<=node.x||node.y+node.height<=other.y||other.y+other.height<=node.y,`${node.id} overlaps ${other.id}`);
   }
  }
 }
});
