import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
// Adapt the pinned LikeC4 1.59.4 viewer: relationship actions open curated views.
// Fail the build if the upstream API changes, rather than silently losing this behavior.
export function targetView(fqn) {
 if(fqn.startsWith('hardware.ups'))return 'power';
 if(fqn.startsWith('lan')||fqn.startsWith('oke.network')||fqn.startsWith('hardware.router')||fqn.startsWith('home.dns')||fqn.startsWith('edge.warp'))return 'network';
 if(fqn.startsWith('data')||fqn==='external.idrive')return 'storage';
 if(fqn.startsWith('home.recording'))return 'media';
 if(fqn==='bws'||fqn.endsWith('.eso'))return 'secrets';
 if(fqn.startsWith('control'))return 'delivery';
 if(fqn.startsWith('monitoring')||fqn==='home.agent')return 'observability';
 if(fqn.startsWith('hardware')||fqn.startsWith('data')||fqn.startsWith('oke')||fqn==='reventer')return 'placement';
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
