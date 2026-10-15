import {readdirSync,readFileSync,writeFileSync} from 'node:fs';
import {relative,resolve} from 'node:path';
import {parseAllDocuments} from 'yaml';
import {fileURLToPath} from 'node:url';
const ignored=new Set(['.git','.terraform','node_modules','.generated','dist','.state']);
export function inventory(root){
 const records=[];
 function walk(dir){
  for(const entry of readdirSync(dir,{withFileTypes:true})){
   if(entry.isSymbolicLink()||ignored.has(entry.name)||entry.name.startsWith('.'))continue;
   const path=resolve(dir,entry.name),file=relative(root,path);
   if(entry.isDirectory()){walk(path);continue;}
   if(!file.startsWith('terraform/')&&!file.startsWith('k8s/')&&!file.startsWith('ansible/')&&!file.startsWith('talos/'))continue;
   if(entry.name.endsWith('.tf')){
    // Count resource declarations, never read variable values into the public inventory.
    const source=readFileSync(path,'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/^\s*(?:#|\/\/).*$/gm,'');
    for(const m of source.matchAll(/^\s*(resource|module)\s+"([^"]+)"(?:\s+"([^"]+)")?\s*\{/gm)){
     records.push({id:`${file}:${m[1]}:${m[2]}:${m[3]??''}`,type:m[1]==='module'?'Terraform module':m[2],name:m[3]??m[2],file});
    }
   }else if(/\.ya?ml$/.test(entry.name)){
    for(const doc of parseAllDocuments(readFileSync(path,'utf8'))){
     if(doc.errors.length)throw new Error(`Invalid YAML: ${file}`);
     const value=doc.toJS();
     if(file.startsWith('k8s/')&&value?.apiVersion&&value?.kind&&value?.metadata?.name){
      records.push({id:`${file}:${value.kind}:${value.metadata.namespace??''}:${value.metadata.name}`,type:value.kind,name:value.metadata.name,namespace:value.metadata.namespace??'',file});
     }
    }
   }
  }
 }
 walk(root);return records.sort((a,b)=>a.id.localeCompare(b.id));
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const rows=inventory(resolve('../..'));writeFileSync('resource-inventory.json',JSON.stringify(rows,null,2)+'\n');
 console.log(`Inventory: ${rows.length} Terraform/Kubernetes declarations (names and source paths only)`);
}
