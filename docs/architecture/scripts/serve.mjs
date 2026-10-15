import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.ico':'image/x-icon'};
const server=createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  const path=resolve(root,'.'+decodeURIComponent(url.pathname)+(url.pathname.endsWith('/')?'index.html':''));
  if(!path.startsWith(root+sep)){res.writeHead(403).end();return;}
  res.setHeader('Content-Type',types[extname(path)]??'application/octet-stream');res.end(await readFile(path));
 }catch{res.writeHead(404).end();}
});
server.listen(Number(process.env.ARCHITECTURE_PORT??4173),'127.0.0.1',()=>console.log(`Architecture: http://127.0.0.1:${server.address().port}/`));
