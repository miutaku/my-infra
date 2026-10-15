import {spawnSync} from 'node:child_process';
import {writeFileSync,copyFileSync} from 'node:fs';
for(const [command,args] of [['node',['scripts/inventory.mjs']],['./node_modules/.bin/likec4',['validate']],['./node_modules/.bin/vite',['build']]]){
 const result=spawnSync(command,args,{stdio:'inherit'});if(result.status!==0)process.exit(result.status??1);
}
copyFileSync('resource-inventory.json','dist/resource-inventory.json');
copyFileSync('resources.html','dist/resources.html');
writeFileSync('dist/.nojekyll','');
