import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
// Adapt the pinned LikeC4 1.59.4 viewer: relationship actions open curated views.
// Fail the build if the upstream API changes, rather than silently losing this behavior.
export function targetView(fqn) {
 if(fqn.startsWith('premises.hardware.ups'))return 'power';
 if(fqn.startsWith('premises.lan')||fqn.startsWith('oke.network')||fqn.startsWith('premises.hardware.router')||fqn.startsWith('premises.home.dns')||fqn.startsWith('external.edge.warp'))return 'network';
 if(fqn.startsWith('premises.data')||fqn==='external.idrive')return 'storage';
 if(fqn.startsWith('external.edge')&&!fqn.startsWith('external.edge.warp'))return 'access';
 if(fqn==='external.bws'||fqn.endsWith('.eso'))return 'secrets';
 if(fqn==='external.github'||fqn==='external.terraform_cloud')return 'delivery';
 if(fqn.startsWith('consumers'))return 'delivery';
 if(fqn.startsWith('control'))return 'delivery';
 if(fqn==='external.grafana'||fqn.startsWith('monitoring')||fqn==='premises.home.agent')return 'observability';
 if(fqn.startsWith('premises.hardware')||fqn.startsWith('premises.data')||fqn.startsWith('oke')||fqn.startsWith('shared_prd'))return 'placement';
 return 'home_apps';
}
export function adaptViewer(directory) {
 let replaced=0;
 for(const name of readdirSync(directory).filter(n=>n.endsWith('.js'))){
  const path=`${directory}/${name}`,source=readFileSync(path,'utf8');
  const pattern=/openRelationshipsBrowser\((\w+),(\w+)\)\{this\.send\(\{type:`open\.relationshipsBrowser`,fqn:\1,\.\.\.\2&&\{scope:\2\}\}\)\}/g;
  const next=source.replace(pattern,(_,subject)=>{
   replaced++;
   return `openRelationshipsBrowser(${subject}){window.location.hash='/view/'+(${targetView.toString()})(${subject});}`;
  });
  if(next!==source)writeFileSync(path,next);
 }
 if(replaced!==1)throw new Error(`LikeC4 relationship navigation adapter expected 1 hook, found ${replaced}`);
}
