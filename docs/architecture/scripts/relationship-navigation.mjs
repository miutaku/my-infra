import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
// Adapt the pinned LikeC4 1.59.4 viewer: relationship actions open curated views.
// Fail the build if the upstream API changes, rather than silently losing this behavior.
export function targetView(fqn) {
 if(fqn.startsWith('premises.hardware.network'))return 'network';
 if(fqn.startsWith('premises.home.platform'))return 'platform';
 if(fqn==='premises.hardware.x570')return 'pve_x570';
 if(fqn==='premises.hardware.b550m')return 'pve_b550m';
 if(fqn.startsWith('premises.home.apps'))return 'home_workloads';
 if(fqn.startsWith('premises.hardware.ups'))return 'power';
 if(fqn.startsWith('premises.lan')||fqn.startsWith('premises.hardware.network.router')||fqn.startsWith('premises.home.dns')||fqn.startsWith('external.edge.warp'))return 'network';
 if(fqn.startsWith('premises.data')||fqn==='external.idrive')return 'storage';
 if(fqn.startsWith('external.edge')&&!fqn.startsWith('external.edge.warp'))return 'access';
 if(fqn==='external.bws'||fqn.endsWith('.eso'))return 'secrets';
 if(fqn==='external.github'||fqn==='external.terraform_cloud')return 'delivery';
 if(fqn.startsWith('consumers'))return 'index';
 if(fqn.startsWith('premises.management'))return 'delivery';
 if(fqn==='external.grafana'||fqn==='premises.home.agent')return 'observability';
 if(fqn.startsWith('premises.hardware')||fqn.startsWith('premises.data'))return 'placement';
 return 'home_apps';
}
// LikeC4 1.59.4 drops deployment-node navigateTo while compiling views.
// Keep the host drill-down usable in the shell until native deployment navigation works.
export function deploymentTarget(ref){
 return {'homeSite.x570':'pve_x570','homeSite.b550m':'pve_b550m','homeSite.talos':'home_apps','homeSite.network':'network'}[ref]??null;
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
