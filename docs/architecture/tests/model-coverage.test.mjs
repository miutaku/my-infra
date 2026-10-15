import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {authenticationMode} from '../scripts/catalog.mjs';
import {inventory} from '../scripts/inventory.mjs';
import {parseAllDocuments} from 'yaml';
const model=JSON.parse(readFileSync('model.json','utf8'));
const coverage=JSON.parse(readFileSync('model-coverage.json','utf8'));
test('every source declaration resolves into the compiled model and every Application into its actual namespace/cluster',()=>{
 for(const row of coverage.records){
  assert.ok(model.elements[row.modelRef],`Missing model element for ${row.file}: ${row.name}`);
  if(row.type==='Application'){
   const deployed=model.deployments.elements[row.deploymentRef];
   assert.ok(deployed,`Missing deployment for ${row.name}`);assert.equal(deployed.element,row.modelRef);
   const source=parseAllDocuments(readFileSync(resolve('../..',row.file),'utf8')).map(d=>d.toJS()).find(d=>d?.kind==='Application'&&d.metadata.name===row.name);
   assert.equal(row.namespace,source.spec.destination.namespace??'default');
   if(source.spec.destination.name==='oke-prd')assert.equal(row.scope,'prd');
   if(source.spec.destination.name==='oke-stg')assert.equal(row.scope,'stg');
  }
 }
});
test('manual details preserve independent media workers, LXC, DB, NUT and correct local monitoring storage',()=>{
 for(const ref of ['premises.home.recording.tnlastation.encode','premises.home.recording.tnlastation.streaming','premises.home.recording.tnlastation.mediamtx','premises.hardware.loockit_a','premises.hardware.loockit_b','premises.hardware.tuner_prod','premises.hardware.tuner_stg','premises.data.databases.postgres','premises.data.databases.mariadb','premises.data.pbs','external.idrive','premises.hardware.ups.pi_a','premises.hardware.ups.pi_b'])assert.ok(model.elements[ref],ref);
 const relations=Object.values(model.relations);
 assert.ok(relations.some(r=>r.source.model==='premises.home.agent.collector'&&r.target.model==='premises.home.agent.local_store'));
 assert.ok(!relations.some(r=>r.source.model==='premises.home.agent'&&r.target.model==='monitoring.vms'));
 const physical=Object.values(model.deployments.elements);
 assert.equal(physical.filter(r=>r.kind==='container').length,4);
 assert.equal(physical.filter(r=>r.kind==='vm').length,13);
 for(const element of Object.values(model.elements))for(const link of element.links??[]){
  const prefix='https://github.com/miutaku/my-infra/';if(!link.url.startsWith(prefix))continue;
  const path=link.url.replace(/^https:\/\/github.com\/miutaku\/my-infra\/(blob|tree)\/main\//,'');
  assert.ok(existsSync(resolve('../..',decodeURI(path))),`Broken definition link ${link.url}`);
 }
});

test('every active Proxmox module and LXC declaration has a physical placement with source evidence',()=>{
 const declared=inventory(resolve('../..')).filter(row=>row.file==='terraform/pve/main.tf'&&row.type==='Terraform module'||row.type==='proxmox_virtual_environment_container');
 const placed=Object.values(model.deployments.elements);
 for(const row of declared){
  const reference=row.type==='Terraform module'?'module.'+row.name:row.type+'.'+row.name;
  assert.ok(placed.some(node=>node.metadata?.sourceFile===row.file&&node.metadata?.resourceRef===reference),`Missing physical placement for ${row.file} ${reference}`);
 }
});


test('home storage, TrueNAS VMs and backup execution remain separate from external services',()=>{
 const nodes=Object.values(model.views).flatMap(view=>view.nodes);
 for(const ref of ['external.edge','external.bws','external.grafana','external.github','external.terraform_cloud','external.idrive'])assert.ok(nodes.some(node=>node.modelRef===ref&&node.parent==='external'),ref);
 for(const ref of ['premises.home','premises.data','premises.hardware','premises.lan'])assert.ok(nodes.some(node=>node.modelRef===ref&&node.parent==='premises'),ref);
 for(const [ref,logical] of [['homeSite.x570.nas1','premises.data.nas.nas01'],['homeSite.b550m.nas2','premises.data.nas.nas02']]){
  assert.equal(model.deployments.elements[ref].kind,'vm');
  assert.ok(Object.values(model.deployments.elements).some(e=>e.element===logical&&e.id.startsWith(ref+'.')));
 }
 const jobs=coverage.records.filter(row=>row.type==='CronJob'&&row.executionRef);
 assert.equal(jobs.length,4);
 for(const row of jobs){
  assert.ok(row.deploymentRef.startsWith('homeSite.talos.ns_'));
  assert.equal(model.deployments.elements[row.deploymentRef].element,row.executionRef);
 }
 for(const ref of ['premises','external','premises.data.nas','premises.home','external.bws','external.edge'])assert.ok(model.views.index.nodes.some(node=>node.model===ref||node.id===ref),`Missing overview boundary: ${ref}`);
});


test('foundation ownership never expands the consumer application and PRD addons remain provider-owned',()=>{
 assert.ok(model.elements['consumers.reventer']);
 assert.equal(Object.keys(model.elements).filter(ref=>ref.startsWith('consumers.reventer.')).length,0);
 assert.equal(Object.keys(model.elements).filter(ref=>ref==='reventer'||ref.startsWith('reventer.')).length,0);
 const consumers=coverage.records.filter(row=>row.type==='Application'&&row.owner==='consumer');
 assert.ok(consumers.length>0);
 for(const row of consumers)assert.ok(row.modelRef.startsWith('control.argo.workloads.'),row.name);
 const prdEso=coverage.records.find(row=>row.type==='Application'&&row.name==='oci-prd-external-secrets');
 assert.equal(prdEso.owner,'my-infra');assert.equal(prdEso.modelRef,'shared_prd.eso');
 assert.ok(!model.views.index.nodes.some(node=>node.modelRef?.startsWith('control.argo.workloads.')));
});

test('public access keeps authentication separate from traffic purpose and rejects unclassified routes',()=>{
 const routes=coverage.records.filter(row=>row.type==='Tunnel hostname');
 assert.ok(routes.length>0);
 for(const row of routes){
  assert.equal(row.accessMode,row.name==='loockit-api'?'mtls':'access');
  assert.equal(model.elements[row.modelRef].metadata.accessMode,row.accessMode);
 }
 assert.equal(routes.find(row=>row.name==='nextcloud').trafficKind,'runtime');
 assert.equal(routes.find(row=>row.name==='argocd-home-k8s').trafficKind,'admin');
 assert.throws(()=>authenticationMode('loockit-api',new Set()),/authentication policy/);
 assert.equal(authenticationMode('loockit-api',new Set(),new Set(['loockit-api'])),'mtls');
 assert.throws(()=>authenticationMode('new-unclassified-host',new Set()),/authentication policy/);
 const relations=Object.values(model.relations);
 assert.ok(relations.some(r=>r.source.model==='external.edge.access'&&r.target.model==='external.edge.tunnel'&&r.kind==='authenticate'));
 for(const id of ['index','home_apps','access']){
  const view=model.views[id];
  const entrance=view.edges.filter(edge=>edge.source==='user');
  assert.ok(entrance.length>0);
  assert.ok(entrance.every(edge=>edge.target==='external.edge.access'),id);
  assert.ok(!view.edges.some(edge=>edge.source==='external.edge'&&edge.target.startsWith('premises')),id);
 }
 assert.ok(model.views.access.nodes.some(node=>node.modelRef==='external.edge.mtls'));
 assert.ok(!model.views.index.edges.some(edge=>['deploy','admin'].includes(edge.kind)&&edge.target==='consumers.reventer'));
});
