import {existsSync} from 'node:fs';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep,join} from 'node:path';
import {chromium} from 'playwright';

export async function captureViews(directory,env,views,destination){
 const root=resolve(directory);
 const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
 const server=createServer(async(request,response)=>{
  try{
   const url=new URL(request.url,'http://localhost');
   const path=resolve(root,'.'+decodeURIComponent(url.pathname)+(url.pathname.endsWith('/')?'index.html':''));
   if(!path.startsWith(root+sep)){response.writeHead(403).end();return;}
   response.setHeader('Content-Type',mime[extname(path)] ?? 'application/octet-stream');
   response.end(await readFile(path));
  }catch{response.writeHead(404).end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 try{
  browser=await chromium.launch({headless:true,...(process.env.ARCHITECTURE_REVIEW_BROWSER_EXECUTABLE?
   {executablePath:process.env.ARCHITECTURE_REVIEW_BROWSER_EXECUTABLE}:{})});
  const native=existsSync(join(root,'diagram/index.html'));
  const context=await browser.newContext({deviceScaleFactor:1,colorScheme:'light'});
  for(const [id,view] of Object.entries(views)){
   if(!/^[\w.-]+$/.test(id)) throw new Error(`Unsupported view ID: ${id}`);
   const page=await context.newPage();
   try{
    const {width,height}=view.bounds;
    await page.setViewportSize({width:Math.ceil(width+80),height:Math.ceil(height+180)});
    await page.goto(`http://127.0.0.1:${server.address().port}/`+(native?`diagram/#/export/${encodeURIComponent(id)}/?padding=20&theme=light`:`#/view/${encodeURIComponent(id)}/`));
    await page.waitForSelector('.react-flow.initialized',{timeout:60000});
    await page.evaluate(()=>document.fonts.ready);
    await page.locator('img').evaluateAll(images=>Promise.all(images.map(image=>image.decode().catch(()=>{}))));
    const diagram=native?page.getByTestId('export-page'):page.locator('main');
    await diagram.screenshot({path:join(destination,`${id}.png`),animations:'disabled',timeout:60000});
    console.log(`${env}/${id}: captured at native resolution`);
   }finally{await page.close();}
  }
 }finally{
  if(browser) await browser.close();
  await new Promise(resolve=>server.close(resolve));
 }
}
