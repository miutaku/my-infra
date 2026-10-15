import {spawnSync} from 'node:child_process';
import {writeFileSync,copyFileSync,rmSync} from 'node:fs';
import {adaptViewer} from './relationship-navigation.mjs';
import {adaptLineFilters} from './line-filters.mjs';
rmSync('dist',{recursive:true,force:true});
for(const [command,args] of [
 ['node',['scripts/inventory.mjs']],
 ['./node_modules/.bin/likec4',['validate']],
 ['./node_modules/.bin/likec4',['build','.','-o','dist/diagram','--use-hash-history','--base','./','--title','my-infra Architecture']],
]){
 const result=spawnSync(command,args,{stdio:'inherit'});if(result.status!==0)process.exit(result.status??1);
}
adaptViewer('dist/diagram/assets');
adaptLineFilters('dist/diagram/assets');
copyFileSync('shell.html','dist/index.html');
copyFileSync('resource-inventory.json','dist/resource-inventory.json');
copyFileSync('resources.html','dist/resources.html');
writeFileSync('dist/.nojekyll','');
