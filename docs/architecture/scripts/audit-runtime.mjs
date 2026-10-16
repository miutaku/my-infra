// Read-only audit; retain names, placement and source references, never configuration values.
import {execFileSync} from 'node:child_process';
import {writeFileSync,readFileSync} from 'node:fs';
import {bootstrapWorkloads} from './runtime-scope.mjs';
const get=resource=>JSON.parse(execFileSync('kubectl',['--context','home-k8s','get',resource,'-A','-o','json'],{encoding:'utf8',maxBuffer:16*1024*1024})).items;
const coverage=JSON.parse(readFileSync('model-coverage.json','utf8')).records;
const declarations=new Map(coverage.filter(row=>row.type==='Application').map(row=>[row.name,row]));
const apps=get('applications.argoproj.io').filter(a=>!a.spec.destination.name&&a.spec.destination.server==='https://kubernetes.default.svc');
const bootstrap=Object.fromEntries(bootstrapWorkloads.map(w=>[`${w.namespace}/${w.kind}/${w.name}`,w.modelRef]));
const workloads=get('deployments,statefulsets,daemonsets,cronjobs').map(w=>{
 const namespace=w.metadata.namespace,key=`${namespace}/${w.kind}/${w.metadata.name}`;
 const app=apps.find(a=>(a.status?.resources??[]).some(r=>r.kind===w.kind&&r.name===w.metadata.name&&(r.namespace??a.spec.destination.namespace)===namespace));
 const modelRef=app?declarations.get(app.metadata.name)?.modelRef:bootstrap[key]??(namespace==='argocd'&&/^(argocd-)/.test(w.metadata.name)?'premises.management.argo':null);
 return {namespace,kind:w.kind,name:w.metadata.name,application:app?.metadata.name??null,modelRef:modelRef??null,origin:app?'ArgoCD':modelRef?'cluster-bootstrap':'unmapped'};
});
const report={checkedAt:new Date().toISOString(),context:'home-k8s',
 applications:apps.map(a=>({name:a.metadata.name,namespace:a.spec.destination.namespace,modelRef:declarations.get(a.metadata.name)?.modelRef??null,health:a.status?.health?.status,sync:a.status?.sync?.status})),
 nodes:get('nodes').map(n=>({name:n.metadata.name,ip:n.status.addresses.find(a=>a.type==='InternalIP')?.address,os:n.status.nodeInfo.osImage,ready:n.status.conditions.find(c=>c.type==='Ready')?.status==='True'})),
 workloads,unmapped:workloads.filter(w=>!w.modelRef),
 missingApplicationDefinitions:apps.filter(a=>!declarations.has(a.metadata.name)).map(a=>a.metadata.name)};
writeFileSync('evidence/home-k8s-runtime.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({applications:report.applications.length,workloads:workloads.length,unmapped:report.unmapped,missingApplicationDefinitions:report.missingApplicationDefinitions},null,2));
