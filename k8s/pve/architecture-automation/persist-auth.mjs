import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {request} from 'node:https';
import {createServer} from 'node:http';
import {pathToFileURL} from 'node:url';
export const fingerprint=value=>createHash('sha256').update(value).digest('hex');
export function readAuth(path){
 const raw=readFileSync(path,'utf8');
 const value=JSON.parse(raw);
 if(Buffer.byteLength(raw)>30000||value.auth_mode!=='chatgpt'||!value.tokens?.refresh_token||value.OPENAI_API_KEY)throw new Error('Invalid account authentication');
 return raw;
}
export function createPersister({read,readSecret,writeSecret}){
 let expected=fingerprint(read()),busy=Promise.resolve();
 return ()=>{
  const next=busy.then(async()=>{
   const raw=read(),current=fingerprint(raw);
   if(current===expected)return;
   const secret=await readSecret();
   const remote=fingerprint(Buffer.from(secret.data['auth.json'],'base64'));
   if(remote===current){expected=current;return;}
   if(remote!==expected)throw new Error('Authentication state changed outside this pod');
   const body={apiVersion:'v1',kind:'Secret',metadata:{name:'codex-account-auth',namespace:'architecture-automation',resourceVersion:secret.metadata.resourceVersion},type:'Opaque',data:{'auth.json':Buffer.from(raw).toString('base64')}};
   await writeSecret(body);expected=current;
  });
  busy=next.catch(()=>{});return next;
 };
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const auth='/state/auth.json',identity='/var/run/private-service-account';
 const url='https://kubernetes.default.svc/api/v1/namespaces/architecture-automation/secrets/codex-account-auth';
 const call=(method,body)=>new Promise((resolve,reject)=>{
  const req=request(url,{method,ca:readFileSync(identity+'/ca.crt'),headers:{Authorization:'Bearer '+readFileSync(identity+'/token','utf8').trim(),'Content-Type':'application/json'}},res=>{
   let data='';res.on('data',chunk=>{data+=chunk;});res.on('end',()=>{
    if(res.statusCode!==200)return reject(new Error('Authentication persistence API rejected request'));
    try{resolve(JSON.parse(data));}catch{reject(new Error('Invalid persistence response'));}
   });
  });
  req.setTimeout(10000,()=>req.destroy(new Error('Persistence timeout')));req.on('error',reject);req.end(body===undefined?undefined:JSON.stringify(body));
 });
 const persist=createPersister({read:()=>readAuth(auth),readSecret:()=>call('GET'),writeSecret:body=>call('PUT',body)});
 const server=createServer(async(req,res)=>{
  if(req.method!=='POST'||req.url!=='/sync'){res.writeHead(404);res.end();return;}
  try{await persist();res.writeHead(200,{'Content-Type':'application/json'});res.end('{"ok":true}');}
  catch{res.writeHead(503);res.end('Persistence failed');}
 });
 server.listen(8787,'127.0.0.1');
 const timer=setInterval(()=>persist().catch(()=>console.error('Authentication persistence failed')),5000);
 process.on('SIGTERM',async()=>{clearInterval(timer);try{await persist();server.close(()=>process.exit(0));}catch{console.error('Final authentication persistence failed');process.exit(1);}});
}
