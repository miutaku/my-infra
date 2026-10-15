import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync,symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {inventory} from '../scripts/inventory.mjs';
test('extracts declarations without publicizing Secret values or traversing symlinks',()=>{
 const root=mkdtempSync(join(tmpdir(),'inventory-test-'));
 try{
  mkdirSync(join(root,'k8s'));mkdirSync(join(root,'terraform'));
  writeFileSync(join(root,'k8s/secret.yaml'),'apiVersion: v1\nkind: Secret\nmetadata:\n  name: example\nstringData:\n  token: never-publish-this\n');
  writeFileSync(join(root,'terraform/main.tf'),'# resource "ignored" "comment" {}\nresource "oci_core_subnet" "workers" {}\nmodule "vm" {}\n');
  symlinkSync('/etc/passwd',join(root,'k8s/escape.yaml'));
  const result=inventory(root);assert.equal(result.length,3);assert.equal(JSON.stringify(result).includes('never-publish-this'),false);
  assert.deepEqual(result.map(row=>row.name).sort(),['example','vm','workers']);
 }finally{rmSync(root,{recursive:true,force:true});}
});
