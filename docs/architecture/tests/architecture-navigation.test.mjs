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
 for(const ref of ['homeSite.pve.controlplanes.cp1','homeSite.pve.workers.worker1','homeSite.pve.controlplanes.cp2','homeSite.pve.controlplanes.cp3','homeSite.pve.workers.worker2','homeSite.pve.storage.nas1','homeSite.pve.storage.nas2','homeSite.pve.storage.pbs']){
  assert.equal(view.nodes.find(n=>n.id===ref)?.parent,'homeSite.pve',ref);
 }
 assert.ok(!view.nodes.some(n=>['homeSite.pve.x570','homeSite.pve.b550m','homeSite.talos'].includes(n.id)));
 assert.equal(view.edges.length,5);
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
 for(const [ref,view] of [['premises.home.nextcloud','nextcloud'],['premises.home.recording','recording'],['premises.home.loockit','loockit'],['premises.home.platform','platform']])assert.equal(manifest.home_apps.deploymentNavigation[ref],view);
 for(const [host,ref]of [['loockit1','loockit_a'],['loockit2','loockit_b']]){
  const ct=model.deployments.elements[`homeSite.pve.smartlocks.${host}`];
  assert.match(ct.title,/Loockit/);
  assert.equal(model.deployments.elements[`homeSite.pve.smartlocks.${host}.app`].kind,'workload');
  assert.ok(Object.values(model.deployments.elements).some(n=>n.id.startsWith(`homeSite.pve.smartlocks.${host}.app.`)&&n.element===`premises.pve.${ref}`));
 }
 for(const view of ['pve_x570','pve_b550m','coupon'])assert.ok(!model.views[view],view);
 assert.ok(!Object.values(model.deployments.elements).some(n=>/^LXC CT\d+$/.test(n.title??'')));
});
test('Loockit proxy checks readiness while its LXC backends use an independent Lease and Bluetooth access',()=>{
 const proxy='premises.home.loockit.proxy',api='premises.home.platform.api';
 for(const [node,ble]of [['loockit_a','bluez'],['loockit_b','bluez']]){
  assert.ok(relation(proxy,`premises.pve.${node}`,'runtime'));
  assert.ok(relation(`premises.pve.${node}`,'external.edge.loockit_lease','runtime'));
  assert.ok(!relation(`premises.pve.${node}`,api,'runtime'));
  assert.ok(relation(`premises.pve.${node}`,`premises.pve.${ble}`,'runtime'));
 }
 assert.ok(!relation(proxy,api,'runtime'));
});
test('TNLaStation PRD and STG each use their own tuner and DB as declared in Kustomize',()=>{
 const base=parse(readFileSync('../../k8s/pve/tnlastation/configmap.yaml','utf8'));
 const stg=parse(readFileSync('../../k8s/pve/tnlastation-staging/kustomization.yaml','utf8'));
 assert.match(base.data['config.yml'],/mirakurun\.app-mirakurun\.svc/);
 for(const [folder,file,endpoint,ref]of [['mirakurun','mirakurun-endpointslice.yaml','192.168.20.132','tuner_prod'],['mirakurun-staging','endpointslice.yaml','192.168.20.142','tuner_stg']]){
  const slice=parse(readFileSync(`../../k8s/pve/${folder}/${file}`,'utf8'));
  assert.equal(slice.endpoints[0].addresses[0],endpoint);
  assert.ok(model.elements[`premises.pve.${ref}`].description.txt.includes(endpoint));
 }
 assert.ok(stg.configMapGenerator[0].literals.some(l=>l.includes('mirakurun.app-mirakurun-staging.svc')));
 for(const [app,tuner,db]of [['tnlastation','tuner_prod','postgres'],['tnlastation_staging','tuner_stg','postgres_staging']]){
  const source=`premises.home.recording.${app}`,target=`premises.pve.${tuner}`;
  assert.ok(relation(source+'.backend',target,'runtime'));
  assert.ok(hasEdge('recording',source,target));
  assert.ok(relation(source+'.backend',`premises.home.databases.${db}`,'runtime'));
 }
 assert.ok(!relation('premises.home.recording.tnlastation.backend','premises.pve.tuner_stg','runtime'));
 assert.ok(!relation('premises.home.recording.tnlastation_staging.backend','premises.pve.tuner_prod','runtime'));
 assert.ok(relation('premises.home.recording.epgstation','premises.pve.tuner_prod','runtime'));
 assert.ok(!model.views.recording.nodes.some(n=>n.id==='premises.home.recording.mirakurun'||n.id==='premises.home.recording.mirakurun_staging'));
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

test('visible PVE guests stay inside the shared PVE boundary in service and network views too',()=>{
 for(const view of Object.values(model.views)){
  for(const node of view.nodes.filter(n=>n.id===n.modelRef&&/^premises\.pve\./.test(n.modelRef??''))){
   const parent=view.nodes.find(n=>n.id===node.parent);
   assert.ok(parent?.id==='premises.pve'||parent?.id.startsWith('premises.pve.'),`${view.id}: ${node.id}`);
  }
 }
});

test('Raspberry Pi workers are summarized, while services and control-plane VMs have the requested boundaries',()=>{
 const workers=model.views.index.nodes.filter(n=>n.id.startsWith('homeSite.workers'));
 assert.equal(workers.length,1);assert.match(workers[0].title,/03・04/);
 for(const id of ['worker_pi1','worker_pi2'])assert.ok(model.deployments.elements[`homeSite.workers.${id}.talos`]);
 assert.ok(!model.elements['premises.home.apps']);
 for(const id of ['loockit','coupon_manager','wol','magic_mirror','annict_scraper'])assert.equal(model.views.home_apps.nodes.find(n=>n.id===`premises.home.${id}`).parent,'premises.home');
 for(const id of ['cp1','cp2','cp3']){
  const node=model.views.placement.nodes.find(n=>n.id===`homeSite.pve.controlplanes.${id}`);
  assert.equal(node.parent,'homeSite.pve.controlplanes');assert.match(node.title,/コントロールプレーン/);assert.doesNotMatch(node.title,/\bCP/);
 }
});
test('VLAN containment replaces membership lines while every canonical guest and NIC remains available',()=>{
 const segments={native1:'native',10:'management',20:'server',30:'client',31:'guest',40:'iot'},view=model.views.vlans;
 assert.ok(!view.nodes.some(n=>['vm','container'].includes(n.kind)||n.id.startsWith('homeSite.pve')));
 for(const guest of Object.values(model.deployments.elements).filter(n=>['vm','container'].includes(n.kind))){
  const segment=`homeSite.lan.${segments[guest.metadata.vlan]}`,projection=model.deployments.elements[segment+'.pve'];
  assert.ok(projection.metadata.placementRefs.split(',').includes(guest.id),guest.id);
  assert.equal(view.nodes.find(n=>n.id===segment+'.pve').parent,segment);
  assert.ok(model.views.placement.nodes.some(n=>n.id===guest.id),guest.id);
  const nic=Object.values(model.deployments.relations).filter(r=>r.tags?.includes('nic')&&r.source.deployment===guest.id);
  assert.equal(nic.length,1,guest.id);assert.equal(nic[0].target.deployment,segment);
 }
 assert.equal(view.edges.length,7);
 assert.equal(view.edges.filter(e=>e.source==='homeSite.ix2215').length,6);
 assert.equal(view.edges.filter(e=>e.source==='providers.warp'&&e.target==='homeSite.lan.server').length,1);
 for(const name of Object.values(segments))assert.ok(view.nodes.some(n=>n.id===`homeSite.lan.${name}`));
});
test('VLAN membership includes physical devices, clients and virtual service addresses with source evidence',()=>{
 const view=model.views.vlans;
 for(const ref of ['native.pve_management','native.switch','native.ap','management.rpi_workers','management.nut','management.kvm','management.management_clients','client.physical_clients','client.wol','iot.av','iot.smart_home','guest.clients','server.service_ips','server.vips'])assert.ok(view.nodes.some(n=>n.id==='homeSite.lan.'+ref),ref);
 const elements=model.deployments.elements;
 assert.equal(elements['homeSite.lan.native.switch'].metadata.addresses,'192.168.0.252');
 assert.equal(elements['homeSite.lan.management.rpi_workers'].metadata.addresses,'192.168.10.107,192.168.10.109');
 assert.equal(elements['homeSite.lan.management.nut'].metadata.addresses,'192.168.10.112,192.168.10.113');
 const config=parse(readFileSync('../../ansible/ix2215/group_vars/all.yml','utf8'));
 const names={main:'native',vlan10:'management',vlan20:'server',vlan30:'client',guest:'guest',vlan40:'iot'};
 for(const profile of config.ix_dhcp_profiles){
  const metadata=elements[`homeSite.lan.${names[profile.name]}`].metadata;
  assert.deepEqual(JSON.parse(metadata.dhcpReservations).map(r=>r.ip),(profile.fixed_assignments??[]).map(r=>r.ip));
  assert.equal(metadata.dhcpRange,profile.assignable_range);
  assert.ok(config.ix_interfaces.some(i=>i.name===metadata.routeInterface&&i.ip_address===metadata.gateway));
  assert.doesNotMatch(JSON.stringify(metadata),/\b(?:[0-9a-f]{2}:){5}[0-9a-f]{2}\b/i);
 }
 for(const node of view.nodes){
  const target=elements[node.id]?.metadata?.drillDown;
  if(target){assert.ok(model.views[target],target);assert.equal(manifest.vlans.deploymentNavigation[node.id],target);}
 }
});
test('restore sources and online NFS use are separate views of the same model',()=>{
 assert.ok(model.views.storage.edges.length>0);assert.ok(model.views.storage.edges.every(e=>e.kind==='backup'));
 assert.ok(model.views.nfs.edges.length>0);assert.ok(model.views.nfs.edges.every(e=>e.kind==='runtime'));
 const nasTargets=new Set(model.views.nfs.edges.map(e=>e.target));
 for(const id of ['nas01','nas02'])assert.ok(nasTargets.has(`premises.pve.${id}`));
 for(const edge of model.views.nfs.edges)for(const id of edge.relations)assert.ok(model.relations[id].tags.includes('nfs'));
 for(const relation of Object.values(model.relations).filter(r=>r.kind==='runtime'&&/^premises\.pve\.nas0[12]$/.test(r.target.model)))assert.ok(relation.tags.includes('nfs'));
});
