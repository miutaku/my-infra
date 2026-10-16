import {spawnSync} from 'node:child_process';
import {writeFileSync,copyFileSync,rmSync,readFileSync} from 'node:fs';
import {targetView,deploymentTarget} from './relationship-navigation.mjs';
import {adaptLineFilters} from './line-filters.mjs';
rmSync('dist',{recursive:true,force:true});
for(const [command,args] of [
 ['node',['scripts/inventory.mjs']],
 ['node',['scripts/catalog.mjs']],
 ['./node_modules/.bin/likec4',['validate']],
 ['./node_modules/.bin/likec4',['export','json','.','-p','my-infra','--skip-layout','-o','model.json']],
 ['./node_modules/.bin/likec4',['build','.','-o','dist/diagram','--use-hash-history','--base','./','--title','my-infra Architecture']],
]){
 const result=spawnSync(command,args,{stdio:'inherit'});if(result.status!==0)process.exit(result.status??1);
}
adaptLineFilters('dist/diagram/assets');
const model=JSON.parse(readFileSync('model.json','utf8'));
const manifest={};
for(const [id,view] of Object.entries(model.views))manifest[id]={
 title:view.title,description:view.description?.txt??view.description?.md??'',
 kinds:[...new Set(view.edges.map(edge=>edge.kind).filter(Boolean))],
 deploymentNavigation:Object.fromEntries(view.nodes.map(node=>[node.id,node.navigateTo??(node.deploymentRef?deploymentTarget(node.deploymentRef):null)]).filter(([,target])=>target&&target!==id)),
};
writeFileSync('dist/view-manifest.json',JSON.stringify(manifest));
copyFileSync('model.json','dist/model.json');
copyFileSync('shell.html','dist/index.html');
copyFileSync('resource-inventory.json','dist/resource-inventory.json');
copyFileSync('resources.html','dist/resources.html');
const coverage=JSON.parse(readFileSync('model-coverage.json','utf8'));
for(const record of coverage.records)record.view=targetView(record.modelRef);
writeFileSync('dist/model-coverage.json',JSON.stringify(coverage));
writeFileSync('dist/.nojekyll','');
