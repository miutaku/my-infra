import {appendFileSync,mkdtempSync,mkdirSync,readFileSync,writeFileSync,existsSync,symlinkSync,cpSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {compareModels,embedReport} from './review-model.mjs';
import {captureViews} from './capture-views.mjs';
const root=resolve('../..'),output=resolve('../../architecture-review');
function run(command,args,cwd=root,capture=false){
 const result=spawnSync(command,args,{cwd,encoding:'utf8',stdio:capture?'pipe':'inherit'});
 if(result.status!==0)throw new Error(`${command} failed: ${capture?result.stderr:result.status}`);
 return result.stdout?.trim();
}
const head=run('git',['rev-parse','HEAD'],root,true);
const baseRef=process.env.ARCHITECTURE_REVIEW_BASE;
const base=baseRef?run('git',['rev-parse','--verify',`${baseRef}^{commit}`],root,true):run('git',['merge-base','HEAD','origin/main'],root,true);
const before=mkdtempSync(join(tmpdir(),'my-infra-review-'));
const report={base,head,environments:{}},models={},inventories={};
let worktree=false;
mkdirSync(output,{recursive:true});
try{
 run('git',['worktree','add','--detach',before,base]);worktree=true;
 const baseDir=join(before,'docs/architecture');
 if(!existsSync(join(baseDir,'package-lock.json')))throw new Error('Base commit predates LikeC4; use a base with the model installed');
 if(readFileSync(join(baseDir,'package-lock.json'),'utf8')===readFileSync('package-lock.json','utf8'))symlinkSync(resolve('node_modules'),join(baseDir,'node_modules'),'dir');
 else run('npm',['ci'],baseDir);
 run('npm',['run','build'],baseDir);
 for(const [side,dir] of [['before',baseDir],['after',resolve('.')]]){
  const destination=join(output,side,'infra');mkdirSync(destination,{recursive:true});
  const modelPath=join(destination,'model.json'),layoutPath=join(destination,'layout.json');
  run('./node_modules/.bin/likec4',['export','json','.','-p','my-infra','--skip-layout','-o',modelPath],dir);
  models[side]=JSON.parse(readFileSync(modelPath,'utf8'));
  run('./node_modules/.bin/likec4',['export','json','.','-p','my-infra','-o',layoutPath],dir);
  const layout=JSON.parse(readFileSync(layoutPath,'utf8'));
  await captureViews(join(dir,'dist'),'infra',layout.views,destination);
  inventories[side]=JSON.parse(readFileSync(join(dir,'resource-inventory.json'),'utf8'));
 }
 const changes=compareModels(models.before,models.after);
 const deploymentDiff=compareModels({...models.before.deployments,views:{},specification:{}},{...models.after.deployments,views:{},specification:{}});
 changes.elements.push(...deploymentDiff.elements.map(row=>({...row,id:'deployment:'+row.id})));
 const inventoryModels=Object.fromEntries(Object.entries(inventories).map(([side,rows])=>[side,{elements:Object.fromEntries(rows.map(row=>[row.id,row])),relations:{},views:{},specification:{}}]));
 changes.inventory=compareModels(inventoryModels.before,inventoryModels.after).elements;
 report.environments.infra={changes,views:Object.fromEntries([...new Set([...Object.keys(models.before.views),...Object.keys(models.after.views)])].sort().map(id=>[id,{title:(models.after.views[id]??models.before.views[id]).title,before:!!models.before.views[id],after:!!models.after.views[id]}]))};
 cpSync('dist',join(output,'explorer'),{recursive:true});
 writeFileSync(join(output,'changes.json'),JSON.stringify(report,null,2));
 writeFileSync(join(output,'source.diff'),run('git',['diff',base,head,'--','docs/architecture'],root,true)+'\n');
 writeFileSync(join(output,'index.html'),embedReport(readFileSync('review.html','utf8'),report));
 const hasChanges=Object.values(changes).some(rows=>rows.length>0);
 if(process.env.GITHUB_OUTPUT)appendFileSync(process.env.GITHUB_OUTPUT,`has_changes=${hasChanges}\n`);
 console.log(`Review ${base} -> ${head}: ${hasChanges?'changed':'unchanged'}`);
}finally{if(worktree)run('git',['worktree','remove','--force',before]);}
