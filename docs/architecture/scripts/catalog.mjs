import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {parseAllDocuments} from 'yaml';
import {inventory} from './inventory.mjs';
const q=value=>JSON.stringify(String(value));
const id=value=>'r_'+createHash('sha256').update(value).digest('hex').slice(0,14);
const slug=value=>value.replace(/[^a-zA-Z0-9_]/g,'_');
const known={nextcloud:'home.nextcloud',epgstation:'home.recording.epgstation',tnlastation:'home.recording.tnlastation','tnlastation-staging':'home.recording.tnlastation',mirakurun:'home.recording.mirakurun','mirakurun-staging':'home.recording.mirakurun_staging',loockit:'home.apps.loockit','coupon-manager':'home.apps.coupon_manager',wol:'home.apps.wol','magic-mirror':'home.apps.magic_mirror','annict-scraper':'home.apps.annict_scraper','annict-rec-sync':'home.recording.annict_sync','annict-rec-sync-tnlastation':'home.recording.annict_sync','annict-rec-sync-tnlastation-staging':'home.recording.annict_sync',mariadb:'data.databases.mariadb',postgres:'data.databases.postgres','postgres-staging':'data.databases.postgres',cloudflared:'home.platform.cloudflared',coredns:'home.dns.coredns',metallb:'home.dns.metallb','external-secrets':'home.eso','external-secrets-config':'home.eso.config',vmagent:'home.agent.collector','victoria-metrics':'home.agent.local_store','pdc-agent':'home.agent.pdc','nas-backup':'data.backups.nas','shared-state-storage':'data.shared', 'root-app':'control.argo.registry'};
function placement(file,destination){
 if(destination.name==='oke-prd'||file.startsWith('k8s/oci-prd/'))return 'prd';
 if(destination.name==='oke-stg'||file.startsWith('k8s/oci/'))return 'stg';
 if(destination.server==='https://kubernetes.default.svc'||(!destination.server&&!destination.name))return 'homeSite.talos';
 throw new Error(`Unknown deployment destination in ${file}; declare its cluster before publishing`);
}
export function generateCatalog(root){
 const rows=inventory(root),apps=[],declarations=new Map(),extensions=[],deployments=new Map(),coverage=[];
 for(const row of rows.filter(row=>row.type==='Application')){
  const doc=parseAllDocuments(readFileSync(resolve(root,row.file),'utf8')).map(doc=>doc.toJS()).find(doc=>doc?.kind==='Application'&&doc.metadata.name===row.name);
  const spec=doc.spec,destination=spec.destination??{},scope=placement(row.file,destination),sources=spec.sources??[spec.source??{}];
  let ref=scope==='homeSite.talos'?known[row.name]:scope==='stg'&&row.name==='oci-external-secrets'?'oke.eso':scope==='prd'&&row.name==='oci-prd-external-secrets'?'reventer.platform.external_secrets':null;
  if(!ref){
   let parent=scope==='homeSite.talos'?'home.apps':scope==='stg'?'oke.services':'reventer.platform';
   if(scope==='homeSite.talos'&&/exporter/.test(row.name))parent='home.agent.exporters';
   else if(scope==='homeSite.talos'&&/^arc-/.test(row.name))parent='control.runner';
   else if(scope==='homeSite.talos'&&/image-updater/.test(row.name))parent='control.images';
   else if(scope==='homeSite.talos'&&/tfc-agent/.test(row.name))parent='control.tfc';
   else if(scope==='homeSite.talos'&&row.name==='reventer-gitops')parent='reventer.platform';
   else if(scope==='homeSite.talos'&&row.name==='architecture-review')parent='control.reviews';
   else if(scope==='homeSite.talos'&&row.name==='descheduler')parent='home.platform';
   ref=`${parent}.${slug(row.name)}`;
   declarations.set(ref,`extend ${parent} { component ${slug(row.name)} ${q(row.name)} }`);
  }
  const sourceText=sources.map(s=>s.path??s.chart??'').filter(Boolean).join(', ');
  extensions.push(`extend ${ref} { link ${'https://github.com/miutaku/my-infra/blob/main/'+encodeURI(row.file)} "Application定義" metadata { application ${q(row.name)} sourceFile ${q(row.file)} namespace ${q(destination.namespace??'default')} scope ${q(scope)} } }`);
  apps.push({...row,ref,scope,namespace:destination.namespace??'default',paths:sources.filter(s=>s.repoURL?.includes('miutaku/my-infra')&&s.path).map(s=>s.path),source:sourceText});
  const key=`${scope}.ns_${slug(destination.namespace??'default')}`;
  if(!deployments.has(key))deployments.set(key,{scope,namespace:destination.namespace??'default',instances:[]});
  deployments.get(key).instances.push(`${id(row.id)} = instanceOf ${ref} { title ${q(row.name)} link ${'https://github.com/miutaku/my-infra/blob/main/'+encodeURI(row.file)} "Application定義" }`);
  coverage.push({...row,modelRef:ref,scope,namespace:destination.namespace??'default',deploymentRef:`${key}.${id(row.id)}`});
 }
 const grouped=new Map();
 for(const row of rows.filter(row=>row.type!=='Application')){
  const app=apps.filter(app=>app.paths.some(path=>row.file.startsWith(path+'/'))).sort((a,b)=>Math.max(...b.paths.map(p=>p.length))-Math.max(...a.paths.map(p=>p.length)))[0];
  let parent=app?.ref;
  if(!parent){
   parent=row.file.startsWith('terraform/cloudflare/')?'edge':row.file.startsWith('terraform/oci-observability')?'monitoring.vms':row.file.startsWith('terraform/oci/')?'oke':row.file.startsWith('terraform/home-k8s/')?'hardware':row.file.startsWith('terraform/pve/')||row.file.includes('-lxc/')?'hardware':row.type==='TrueNAS dataset'?(row.file.includes('nas-01')?'data.nas.nas01':'data.nas.nas02'):row.file.startsWith('k8s/oci-prd/')?'reventer.platform':row.file.startsWith('k8s/oci/')?'oke.services':'definitions';
  }
  const ref=`${parent}.resources.${id(row.id)}`;
  if(!grouped.has(parent))grouped.set(parent,[]);
  grouped.get(parent).push(`component ${id(row.id)} ${q(row.name)} { description ${q(row.type+' / '+row.file+(row.namespace?' / namespace '+row.namespace:''))} link ${'https://github.com/miutaku/my-infra/blob/main/'+encodeURI(row.file)} "定義" metadata { resourceId ${q(row.id)} resourceType ${q(row.type)} sourceFile ${q(row.file)} } }`);
  coverage.push({...row,modelRef:ref,registered:!!app});
 }
 const routes=[],routeElements=[],routeLinks=[];
 const locals=readFileSync(resolve(root,'terraform/cloudflare/locals.tf'),'utf8');
 const homeRoutes=locals.slice(locals.indexOf('home_k8s_services ='),locals.indexOf('  # Private network routes'));
 const protectedPart=locals.match(/access_protected_subdomains\s*=\s*toset\(\[([\s\S]*?)\]\)/)?.[1]??'';
 const protectedNames=new Set([...protectedPart.matchAll(/"([^"\n]+)"/g)].map(m=>m[1]));protectedNames.add('architecture-review');
 const targets={'architecture-review':'control.reviews.architecture_review','argocd-home-k8s':'control.argo',wol:'home.apps.wol','loockit-api':'home.apps.loockit',epgstation:'home.recording.epgstation',tnlastation:'home.recording.tnlastation.gateway','tnlastation-staging':'home.recording.tnlastation.gateway',nextcloud:'home.nextcloud','coupon-manager':'home.apps.coupon_manager.web',unifi:'hardware.unifi','wifi-ap':'hardware.wifi',ix2215:'hardware.router','nas-01':'data.nas.nas01','nas-02':'data.nas.nas02','pve-x570':'hardware.x570','pve-b550m':'hardware.b550m','nanokvm-1':'hardware.kvm','nanokvm-2':'hardware.kvm'};
 for(const match of homeRoutes.matchAll(/"([^"\n]+)"\s*=\s*\{([^{}]*)\}/g)){
  const backend=match[2].match(/backend\s*=\s*"([^"\n]+)"/)?.[1];if(!backend)continue;
  const url=new URL(backend);if(url.username||url.password)throw new Error('Credentials are forbidden in published route metadata');
  const name=match[1],key=id('hostname:'+name),modelRef='edge.routes.'+key,kind=protectedNames.has(name)?'admin':'runtime';
  routeElements.push(`component ${key} ${q(name)} { description ${q(backend+' / '+(kind==='admin'?'Access保護':'個別policyは定義を参照'))} link https://github.com/miutaku/my-infra/blob/main/terraform/cloudflare/locals.tf "hostname定義" }`);
  routeLinks.push(`edge.tunnel .${kind} ${modelRef} "hostname転送"`);
  if(targets[name])routeLinks.push(`${modelRef} .${kind} ${targets[name]} "${kind==='admin'?'認証後の内部接続':'内部接続'}"`);
  if(kind==='admin')routeLinks.push(`edge.access .admin ${modelRef} "Access policy"`);
  const row={id:'hostname:'+name,type:'Tunnel hostname',name,file:'terraform/cloudflare/locals.tf',modelRef};routes.push(row);coverage.push(row);
 }
 const dsl=['// Generated from declarations. Edit source files or the curated model, not this file.','model {',...declarations.values(),...extensions,`extend edge { component routes \"公開hostname / 設定から抽出\" { ${routeElements.join('\n')} } }`,...routeLinks,...[...grouped].map(([parent,items])=>`extend ${parent} { component resources "リソース定義" {\n${items.join('\n')}\n} }`),'}','deployment {',...[...deployments.values()].map(({scope,namespace,instances})=>`extend ${scope} { namespace ns_${slug(namespace)} ${q(namespace)} {\n${instances.join('\n')}\n} }`),'}'].join('\n');
 return {dsl,coverage,apps,rows:[...rows,...routes],routeCount:routes.length};
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(import.meta.filename)){
 const {dsl,coverage,apps,rows,routeCount}=generateCatalog(resolve('../..'));
 writeFileSync('catalog.c4',dsl+'\n');writeFileSync('resource-inventory.json',JSON.stringify(rows,null,2)+'\n');writeFileSync('model-coverage.json',JSON.stringify({applications:apps.length,definitions:coverage.length,tunnelRoutes:routeCount,records:coverage},null,2)+'\n');
 console.log(`Catalog: ${apps.length} Applications and ${coverage.length} resource declarations mapped into the model`);
}
