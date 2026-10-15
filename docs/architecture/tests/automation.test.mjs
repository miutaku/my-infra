import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync,symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {applyUpdate,allowedPaths} from '../scripts/apply-ai-update.mjs';

function fixture(t){
 const root=mkdtempSync(join(tmpdir(),'architecture-update-'));
 t.after(()=>rmSync(root,{recursive:true,force:true}));
 for(const path of allowedPaths){
  mkdirSync(dirname(join(root,path)),{recursive:true});
  writeFileSync(join(root,path),path.endsWith('.json')?'{}':'original');
 }
 return root;
}
const model='docs/architecture/logical.c4';
const inventory='docs/architecture/views.c4';
const result=updates=>({summary:'更新理由',updates});

test('applies model changes and ignores identical or empty results',t=>{
 const root=fixture(t);
 assert.deepEqual(applyUpdate(root,result([])),[]);
 const change={path:model,content:'new model'};
 assert.deepEqual(applyUpdate(root,result([change])),[model]);
 assert.equal(readFileSync(join(root,model),'utf8'),'new model');
 assert.deepEqual(applyUpdate(root,result([change])),[]);
});

test('rejects forbidden authentication edits before writing any model',t=>{
 const root=fixture(t);
 assert.throws(()=>applyUpdate(root,result([
  {path:model,content:'new'},
  {path:'docs/architecture/functions/_middleware.js',content:'forbidden'},
 ])),/forbidden/);
 assert.equal(readFileSync(join(root,model),'utf8'),'original');
});

test('rejects duplicates, invalid content and malformed results atomically',t=>{
 const root=fixture(t);
 assert.throws(()=>applyUpdate(root,result([
  {path:model,content:'first'},{path:model,content:'second'},
 ])),/forbidden/);
 assert.throws(()=>applyUpdate(root,result([
  {path:model,content:'new'},{path:inventory,content:null},
 ])),/forbidden/);
 assert.throws(()=>applyUpdate(root,{summary:'x',updates:null}),/Invalid/);
 assert.equal(readFileSync(join(root,model),'utf8'),'original');
});

test('rejects symbolic-link targets',t=>{
 const root=fixture(t);
 rmSync(join(root,model));
 symlinkSync(join(root,inventory),join(root,model));
 assert.throws(()=>applyUpdate(root,result([{path:model,content:'new'}])),/regular file/);
 assert.equal(readFileSync(join(root,inventory),'utf8'),'original');
});
