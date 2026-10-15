import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
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
 for(const ref of ['home.recording.tnlastation.encode','home.recording.tnlastation.streaming','home.recording.tnlastation.mediamtx','hardware.loockit_a','hardware.loockit_b','hardware.tuner_prod','hardware.tuner_stg','data.databases.postgres','data.databases.mariadb','data.pbs','external.idrive','hardware.ups.pi_a','hardware.ups.pi_b'])assert.ok(model.elements[ref],ref);
 const relations=Object.values(model.relations);
 assert.ok(relations.some(r=>r.source.model==='home.agent.collector'&&r.target.model==='home.agent.local_store'));
 assert.ok(!relations.some(r=>r.source.model==='home.agent'&&r.target.model==='monitoring.vms'));
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
