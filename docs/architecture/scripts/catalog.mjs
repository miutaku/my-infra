import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {parseAllDocuments} from 'yaml';
import {networkMemberships} from './network-memberships.mjs';
import {inventory} from './inventory.mjs';
import {bootstrapWorkloads} from './runtime-scope.mjs';
import {isReventerDedicated} from './ownership.mjs';
const q=value=>JSON.stringify(String(value));
const id=value=>'r_'+createHash('sha256').update(value).digest('hex').slice(0,14);
const slug=value=>value.replace(/[^a-zA-Z0-9_]/g,'_');
const known={nextcloud:'premises.home.nextcloud',epgstation:'premises.home.recording.epgstation',tnlastation:'premises.home.recording.tnlastation','tnlastation-staging':'premises.home.recording.tnlastation_staging',mirakurun:'premises.home.recording.mirakurun','mirakurun-staging':'premises.home.recording.mirakurun_staging',loockit:'premises.home.loockit','coupon-manager':'premises.home.coupon_manager',wol:'premises.home.wol','magic-mirror':'premises.home.magic_mirror','annict-scraper':'premises.home.annict_scraper','annict-rec-sync':'premises.home.recording.annict_sync','annict-rec-sync-tnlastation':'premises.home.recording.annict_sync','annict-rec-sync-tnlastation-staging':'premises.home.recording.annict_sync',mariadb:'premises.home.databases.mariadb',postgres:'premises.home.databases.postgres','postgres-staging':'premises.home.databases.postgres_staging',cloudflared:'premises.home.platform.cloudflared',coredns:'premises.home.dns.coredns',metallb:'premises.home.dns.metallb','external-secrets':'premises.home.eso','external-secrets-config':'premises.home.eso.config',vmagent:'premises.home.agent.collector','victoria-metrics':'premises.home.agent.local_store','pdc-agent':'premises.home.agent.pdc','nas-backup':'premises.home.backups.nas','shared-state-storage':'premises.home.shared', 'root-app':'premises.home.management.argo.registry','arc-runners-config':'premises.home.management.runner.config','architecture-automation-config':'premises.home.management.runner.automation_config'};
function placement(file,destination){
 if(destination.name==='oke-prd'||file.startsWith('k8s/oci-prd/'))return 'prd';
 if(destination.name==='oke-stg'||file.startsWith('k8s/oci/'))return 'stg';
 if(destination.server==='https://kubernetes.default.svc'||(!destination.server&&!destination.name))return 'homeSite.talos';
 throw new Error(`Unknown deployment destination in ${file}; declare its cluster before publishing`);
}
export function authenticationMode(name,protectedNames,mtlsNames=new Set()){
 if(protectedNames.has(name))return 'access';
 if(mtlsNames.has(name))return 'mtls';
 throw new Error(`Declare an authentication policy for public hostname ${name}`);
}
export function generateCatalog(root){
 const rows=inventory(root),apps=[],declarations=new Map(),extensions=[],deployments=new Map(),coverage=[];
 for(const row of rows.filter(row=>row.type==='Application')){
  const doc=parseAllDocuments(readFileSync(resolve(root,row.file),'utf8')).map(doc=>doc.toJS()).find(doc=>doc?.kind==='Application'&&doc.metadata.name===row.name);
  const spec=doc.spec,destination=spec.destination??{},scope=placement(row.file,destination),sources=spec.sources??[spec.source??{}];
  const consumerOwned=isReventerDedicated(row)||sources.some(source=>/[:/]miutaku\/reventer(?:\.git)?$/.test(source.repoURL??''));

  let ref=consumerOwned?`consumers.reventer.definitions.${id(row.id)}`:scope==='homeSite.talos'?known[row.name]:null;
  if(consumerOwned){
   declarations.set(ref,`extend consumers.reventer.definitions { component ${id(row.id)} ${q(row.name)} }`);
  }else if(!ref){
   let parent='premises.home';
   if(scope==='homeSite.talos'&&/exporter/.test(row.name))parent='premises.home.agent.exporters';
   else if(scope==='homeSite.talos'&&/^arc-/.test(row.name))parent='premises.home.management.runner';
   else if(scope==='homeSite.talos'&&/image-updater/.test(row.name))parent='premises.home.management.images';
   else if(scope==='homeSite.talos'&&/tfc-agent/.test(row.name))parent='premises.home.management.tfc_agents';
   else if(scope==='homeSite.talos'&&row.name==='descheduler')parent='premises.home.platform';
   ref=`${parent}.${slug(row.name)}`;
   declarations.set(ref,`extend ${parent} { component ${slug(row.name)} ${q(row.name)} }`);
  }
  const sourceText=sources.map(s=>s.path??s.chart??'').filter(Boolean).join(', ');
  extensions.push(`extend ${ref} { link ${'https://github.com/miutaku/my-infra/blob/main/'+encodeURI(row.file)} "Application定義" metadata { owner ${q(consumerOwned?'reventer':'my-infra')} referenceOnly ${q(consumerOwned?'true':'false')} definitionRepository "my-infra" application ${q(row.name)} sourceFile ${q(row.file)} namespace ${q(destination.namespace??'default')} scope ${q(scope)} } }`);
  apps.push({...row,owner:consumerOwned?'reventer':'my-infra',ref,scope,namespace:destination.namespace??'default',paths:sources.filter(s=>s.repoURL?.includes('miutaku/my-infra')&&s.path).map(s=>s.path),source:sourceText});
  const key=`${scope}.ns_${slug(destination.namespace??'default')}`;
  if(!deployments.has(key))deployments.set(key,{scope,namespace:destination.namespace??'default',instances:[]});
  deployments.get(key).instances.push(`${id(row.id)} = instanceOf ${ref} { title ${q(row.name)} link ${'https://github.com/miutaku/my-infra/blob/main/'+encodeURI(row.file)} "Application定義" }`);
  coverage.push({...row,definitionRepository:'my-infra',owner:consumerOwned?'reventer':'my-infra',modelRef:ref,scope,namespace:destination.namespace??'default',deploymentRef:`${key}.${id(row.id)}`});
 }
 const backupJobs={'nas-backup':'nas','mariadb-backup':'db','victoria-metrics-backup':'metrics','tnlastation-recorded-backup':'recordings'};
 const grouped=new Map();
 for(const row of rows.filter(row=>row.type!=='Application')){
  const app=apps.filter(app=>app.paths.some(path=>row.file.startsWith(path+'/'))).sort((a,b)=>Math.max(...b.paths.map(p=>p.length))-Math.max(...a.paths.map(p=>p.length)))[0];
  const dedicated=isReventerDedicated(row)||app?.owner==='reventer';
  let parent=dedicated?'consumers.reventer':app?.ref;
  if(!parent){
   parent=row.file.startsWith('terraform/cloudflare/')?'external.edge':row.file.startsWith('terraform/home-k8s/')?'premises.hardware':row.file.startsWith('terraform/pve/')||row.file.includes('-lxc/')?'premises.hardware':row.type==='TrueNAS dataset'?(row.file.includes('nas-01')?'premises.pve.nas01':'premises.pve.nas02'):'definitions';
  }
  const ref=dedicated?`consumers.reventer.definitions.${id(row.id)}`:`${parent}.resources.${id(row.id)}`;
  if(dedicated)parent='consumers.reventer.definitions';
  if(!grouped.has(parent))grouped.set(parent,[]);
  grouped.get(parent).push(`component ${id(row.id)} ${q(row.name)} { description ${q(row.type+' / '+row.file+(row.namespace?' / namespace '+row.namespace:''))} link ${'https://github.com/miutaku/my-infra/blob/main/'+encodeURI(row.file)} "定義" metadata { owner ${q(dedicated?'reventer':'my-infra')} referenceOnly ${q(dedicated?'true':'false')} resourceId ${q(row.id)} resourceType ${q(row.type)} sourceFile ${q(row.file)} } }`);
  const record={...row,owner:dedicated?'reventer':'my-infra',definitionRepository:'my-infra',modelRef:ref,registered:!!app};
  if(row.type==='CronJob'&&backupJobs[row.name]&&app?.scope==='homeSite.talos'){
   const namespace=row.namespace||app.namespace,key=`${app.scope}.ns_${slug(namespace)}`;
   if(!deployments.has(key))deployments.set(key,{scope:app.scope,namespace,instances:[]});
   const executionRef=`premises.home.backups.${backupJobs[row.name]}`;
   deployments.get(key).instances.push(`${id(row.id)} = instanceOf ${executionRef} { title ${q(row.name+' / CronJob')} link ${'https://github.com/miutaku/my-infra/blob/main/'+encodeURI(row.file)} "CronJob定義" }`);
   Object.assign(record,{executionRef,deploymentRef:`${key}.${id(row.id)}`,namespace,scope:app.scope});
  }
  coverage.push(record);
 }
 for(const workload of bootstrapWorkloads){
  const key=`homeSite.talos.ns_${slug(workload.namespace)}`;
  if(!deployments.has(key))deployments.set(key,{scope:'homeSite.talos',namespace:workload.namespace,instances:[]});
  deployments.get(key).instances.push(`${id('bootstrap:'+workload.namespace+'/'+workload.name)} = instanceOf ${workload.modelRef} { title ${q(workload.name)} }`);
 }
 const routes=[],routeElements={protected:[],exceptions:[],dedicated:[]},routeLinks=[];
 const locals=readFileSync(resolve(root,'terraform/cloudflare/locals.tf'),'utf8');
 const homeRoutes=locals.slice(locals.indexOf('home_k8s_services ='),locals.indexOf('  # Private network routes'));
 const protectedPart=locals.match(/access_protected_subdomains\s*=\s*toset\(\[([\s\S]*?)\]\)/)?.[1]??'';
 const mtlsNames=new Set();
 const protectedNames=new Set([...protectedPart.matchAll(/"([^"\n]+)"/g)].map(m=>m[1]));
 for(const file of readdirSync(resolve(root,'terraform/cloudflare')).filter(file=>file.endsWith('.tf'))){
  const source=readFileSync(resolve(root,'terraform/cloudflare',file),'utf8');
  if(source.includes('resource "cloudflare_certificate_authorities_hostname_associations" "loockit_api"')&&source.includes('resource "terraform_data" "loockit_api_edge_rules"'))mtlsNames.add('loockit-api');
  if(!source.includes('resource "cloudflare_zero_trust_access_application"'))continue;
  for(const domain of source.matchAll(/domain\s*=\s*"([^"$]+)\.\$\{var\.domain\}"/g))protectedNames.add(domain[1]);
 }
 const targets={'architecture-review':'consumers.reventer','argocd-home-k8s':'premises.home.management.argo',wol:'premises.home.wol',epgstation:'premises.home.recording.epgstation',tnlastation:'premises.home.recording.tnlastation.gateway','tnlastation-staging':'premises.home.recording.tnlastation_staging.gateway',nextcloud:'premises.home.nextcloud.web','coupon-manager':'premises.home.coupon_manager.web',unifi:'premises.pve.unifi','wifi-ap':'premises.hardware.network.ap',ix2215:'premises.hardware.network.router','nas-01':'premises.pve.nas01','nas-02':'premises.pve.nas02','pve-x570':'premises.pve.x570','pve-b550m':'premises.pve.b550m','nanokvm-1':'premises.hardware.kvm','nanokvm-2':'premises.hardware.kvm'};
 for(const match of homeRoutes.matchAll(/"([^"\n]+)"\s*=\s*\{([^{}]*)\}/g)){
  const backend=match[2].match(/backend\s*=\s*"([^"\n]+)"/)?.[1];if(!backend)continue;
  const url=/^http_status:[1-5][0-9]{2}$/.test(backend)?null:new URL(backend);if(url&&(url.username||url.password))throw new Error('Credentials are forbidden in published route metadata');
  const name=match[1],key=id('hostname:'+name);
  const independentLoockit=name==='loockit-api';
  const tunnel=independentLoockit?'external.edge.loockit_tunnel':'external.edge.tunnel';
  const accessMode=authenticationMode(name,protectedNames,mtlsNames);
  const dedicated=isReventerDedicated({file:'terraform/cloudflare/locals.tf',name});
  const group=accessMode==='access'?'protected':'exceptions',modelRef=dedicated?`consumers.reventer.definitions.${key}`:`external.edge.routes.${group}.${key}`;
  const kind=/^(architecture-review|argocd-|unifi$|wifi-ap$|ix2215$|nas-|pve-|nanokvm-)/.test(name)?'admin':'runtime';
  routeElements[dedicated?'dedicated':group].push(`component ${key} ${q(name)} { description ${q((independentLoockit?'LXC loopback HAProxy :18080 / 専用Tunnel':backend)+' / '+(accessMode==='access'?'Cloudflare Access保護':'mTLS・証明書と操作パス制限'))} link https://github.com/miutaku/my-infra/blob/main/terraform/cloudflare/locals.tf "hostname定義" metadata { owner ${q(dedicated?'reventer':'my-infra')} referenceOnly ${q(dedicated?'true':'false')} accessMode ${q(accessMode)} trafficKind ${q(kind)} } }`);
  routeLinks.push(`${tunnel} .${kind} ${modelRef} "hostname転送"`);
  if(independentLoockit){
   for(const target of ['premises.pve.loockit_a','premises.pve.loockit_b'])routeLinks.push(`${modelRef} .runtime ${target} "独立LXC proxy / ready leader"`);
  }else if(url&&targets[name]&&!dedicated){
   routeLinks.push(`${modelRef} .${kind} ${targets[name]} "${kind==='admin'?'認証後の内部接続':'内部接続'}"`);
   routeLinks.push(`external.edge.tunnel .${kind} ${targets[name]} ${q(name+' / '+(url.port||(url.protocol==='https:'?'443':'80'))+' / '+(accessMode==='access'?'Access':'mTLS'))}`);
  }
  const row={id:'hostname:'+name,type:'Tunnel hostname',name,file:'terraform/cloudflare/locals.tf',owner:dedicated?'reventer':'my-infra',definitionRepository:'my-infra',accessMode,trafficKind:kind,modelRef};routes.push(row);coverage.push(row);
 }
 if(routes.some(route=>route.owner==='my-infra'&&route.trafficKind==='runtime'))routeLinks.push('external.edge.tunnel .runtime premises.home "認証済みHTTP / Access・mTLS → 内部Service" { #overview }');
 const guestConnections=[];
 const deploymentSource=readFileSync(resolve(root,'docs/architecture/deployment.c4'),'utf8');
 const segments={native1:'native',10:'management',20:'server',30:'client',31:'guest',40:'iot'};
 // Preserve guest NIC facts and role aggregates. Network memberships project
 // these same guest identities inside the corresponding VLAN boundaries.
 const guests=[];
 let mappedGuests=0;
 for(const pool of deploymentSource.matchAll(/^ {6}cluster (\w+) '[^'\n]+' \{([\s\S]*?)^ {6}\}/gm)){
  const subnets=new Set();
  for(const match of pool[2].matchAll(/(?:vm|container) (\w+) '[^'\n]+' \{[^\n]*?metadata \{ ([^}]+) \}/g)){
   const attributes=Object.fromEntries([...match[2].matchAll(/(\w+) "([^"]+)"/g)].map(m=>[m[1],m[2]]));
   const segment=segments[attributes.vlan];if(!segment)throw new Error(`Unknown guest VLAN ${attributes.vlan}`);
   if(!attributes.host)throw new Error(`Missing placement host for ${match[1]}`);
   mappedGuests++;subnets.add(segment);
   guests.push({ref:`homeSite.pve.${pool[1]}.${match[1]}`,poolTitle:pool[0].match(/^ {6}cluster \w+ '([^']+)'/)[1],segment});
   guestConnections.push(`homeSite.pve.${pool[1]}.${match[1]} .network homeSite.lan.${segment} "" { #nic }`);
  }
  if(subnets.size!==1)throw new Error(`Role pool ${pool[1]} must have one common NIC VLAN`);
  guestConnections.push(`homeSite.pve.${pool[1]} .network homeSite.lan.${[...subnets][0]} "" { #vlan }`);
 }
 if(mappedGuests!==[...deploymentSource.matchAll(/(?:vm|container) \w+ '/g)].length)throw new Error('Every PVE guest must belong to a role pool');
 guestConnections.push('providers.warp .network homeSite.lan.server "WARP / private CIDR routes・policy" { #vlan }');
 for(const [tag,segment]of Object.entries(segments))guestConnections.push(`homeSite.ix2215 .network homeSite.lan.${segment} ${q(tag==='native1'?'native IF':tag==='40'?'BVI4 / tag40':'BVI'+tag)} { #vlan }`);
 const dsl=['// Generated from declarations. Edit source files or the curated model, not this file.','model {',...declarations.values(),...extensions,`extend consumers.reventer.definitions { ${routeElements.dedicated.join('\n')} }`,`extend external.edge { component routes \"公開hostname / 設定から抽出\" { component protected \"Access保護のhostname\" { ${routeElements.protected.join('\n')} } component exceptions \"例外 / mTLS専用API\" { ${routeElements.exceptions.join('\n')} } } }`,...routeLinks,...[...grouped].map(([parent,items])=>parent==='consumers.reventer.definitions'?`extend ${parent} {\n${items.join('\n')}\n}`:`extend ${parent} { component resources "リソース定義" {\n${items.join('\n')}\n} }`),'}','deployment {',networkMemberships(root,guests),...guestConnections,...[...deployments.values()].map(({scope,namespace,instances})=>`extend ${scope} { namespace ns_${slug(namespace)} ${q(namespace)} {\n${instances.join('\n')}\n} }`),'}'].join('\n');
 return {dsl,coverage,apps,rows:[...rows,...routes],routeCount:routes.length};
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(import.meta.filename)){
 const {dsl,coverage,apps,rows,routeCount}=generateCatalog(resolve('../..'));
 writeFileSync('catalog.c4',dsl+'\n');writeFileSync('resource-inventory.json',JSON.stringify(rows,null,2)+'\n');writeFileSync('model-coverage.json',JSON.stringify({applications:apps.length,definitions:coverage.length,tunnelRoutes:routeCount,records:coverage},null,2)+'\n');
 console.log(`Catalog: ${apps.length} Applications and ${coverage.length} resource declarations mapped into the model`);
}
