import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,existsSync,rmSync,symlinkSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {updateSite} from '../scripts/pages-state.mjs';
test('PR snapshots preserve production, production preserves reviews, and expiry removes snapshots',()=>{
 const temp=mkdtempSync(join(tmpdir(),'pages-test-')),root=join(temp,'site'),source=join(temp,'input'),sha='a'.repeat(40);mkdirSync(root);mkdirSync(source);
 try{
  writeFileSync(join(root,'index.html'),'production');writeFileSync(join(source,'index.html'),'review');
  writeFileSync(join(source,'changes.json'),JSON.stringify({head:sha,environments:{infra:{changes:{elements:[],views:[]}}}}));
  const options={root,source,sha,number:'5',snapshot:'123-1',mode:'review',now:1};const result=updateSite(options);
  assert.equal(result.changed,false);assert.equal(readFileSync(join(root,'index.html'),'utf8'),'production');assert.ok(existsSync(join(root,result.path,'index.html')));
  assert.throws(()=>updateSite(options),/already exists/);
  writeFileSync(join(source,'build-info.json'),JSON.stringify({head:sha}));updateSite({...options,mode:'production'});
  assert.ok(existsSync(join(root,result.path,'index.html')));
  updateSite({root,mode:'cleanup',now:32*86400000});assert.equal(existsSync(join(root,result.path)),false);
  assert.throws(()=>updateSite({...options,number:'../escape'}),/Invalid PR/);
  assert.throws(()=>updateSite({...options,sha:'b'.repeat(40)}),/Wrong source/);
  symlinkSync('/etc/passwd',join(source,'unsafe'));assert.throws(()=>updateSite({...options,snapshot:'123-2'}),/regular/);
 }finally{rmSync(temp,{recursive:true,force:true});}
});
