import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync,readFileSync,symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createPersister,readAuth,isMain} from '../../../k8s/pve/architecture-automation/persist-auth.mjs';
import {parse,parseAllDocuments} from 'yaml';
const auth=token=>JSON.stringify({auth_mode:'chatgpt',tokens:{refresh_token:token}});
const secret=raw=>({metadata:{resourceVersion:'7'},data:{'auth.json':Buffer.from(raw).toString('base64')}});
test('writes refreshed auth only, serializes updates, and keeps no-op runs unchanged',async()=>{
 let raw=auth('dummy-initial'),remote=secret(raw),writes=0;
 const persist=createPersister({read:()=>raw,readSecret:async()=>remote,writeSecret:async body=>{writes++;assert.equal(body.metadata.resourceVersion,'7');assert.deepEqual(Object.keys(body.data),['auth.json']);remote=body;}});
 await persist();assert.equal(writes,0);
 raw=auth('dummy-refreshed');await Promise.all([persist(),persist()]);
 assert.equal(writes,1);assert.equal(Buffer.from(remote.data['auth.json'],'base64').toString(),raw);
});
test('refuses to overwrite concurrent external rotation and retries transient failure',async()=>{
 let raw=auth('dummy-initial'),remote=secret(raw),writes=0,fail=true;
 const persist=createPersister({read:()=>raw,readSecret:async()=>remote,writeSecret:async()=>{if(fail)throw new Error('offline');writes++;}});
 raw=auth('dummy-refreshed');await assert.rejects(persist(),/offline/);
 fail=false;await persist();assert.equal(writes,1);
 raw=auth('dummy-third');remote=secret(auth('dummy-external'));
 await assert.rejects(persist(),/outside this pod/);assert.equal(writes,1);
});
test('requires account auth and rejects API keys without logging credentials',t=>{
 const dir=mkdtempSync(join(tmpdir(),'auth-storage-test-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));
 const file=join(dir,'auth.json');writeFileSync(file,auth('dummy'));assert.equal(readAuth(file),auth('dummy'));
 writeFileSync(file,JSON.stringify({auth_mode:'api',OPENAI_API_KEY:'dummy'}));assert.throws(()=>readAuth(file),/Invalid account/);
});
test('runner has no NAS or Kubernetes token mount; helper can access only one Secret',()=>{
 const application=parse(readFileSync('../../k8s/pve/argocd-apps/arc-runner-architecture-automation.yaml','utf8'));
 const values=parse(application.spec.source.helm.values),pod=values.template.spec;
 assert.equal(values.githubConfigUrl,'https://github.com/miutaku/architecture-automation');
 assert.equal(pod.automountServiceAccountToken,false);
 assert.ok(!pod.volumes.some(volume=>volume.persistentVolumeClaim||volume.nfs||volume.hostPath));
 assert.ok(!pod.containers[0].volumeMounts.some(mount=>['auth-seed','private-service-account'].includes(mount.name)));
 const helper=pod.initContainers.find(container=>container.name==='persist-account-auth');
 assert.equal(helper.restartPolicy,'Always');assert.ok(helper.volumeMounts.some(mount=>mount.name==='private-service-account'));
 const resources=parseAllDocuments(readFileSync('../../k8s/pve/architecture-automation/resources.yaml','utf8')).map(doc=>doc.toJS());
 const role=resources.find(row=>row.kind==='Role');
 assert.equal(role.metadata.namespace,'architecture-automation');
 assert.deepEqual(role.rules,[{apiGroups:[''],resources:['secrets'],resourceNames:['codex-account-auth'],verbs:['get','update']}]);
});

test('recognizes the entrypoint through a projected ConfigMap symlink',t=>{
 const dir=mkdtempSync(join(tmpdir(),'auth-entry-test-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));
 const url=new URL('../../../k8s/pve/architecture-automation/persist-auth.mjs',import.meta.url);
 const link=join(dir,'persist-auth.mjs');symlinkSync(url,link);
 assert.equal(isMain(url.href,link),true);assert.equal(isMain(import.meta.url,link),false);
});
