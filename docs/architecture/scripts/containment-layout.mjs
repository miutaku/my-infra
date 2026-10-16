import {spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';

// Generate native LikeC4 snapshots from the CURRENT model. Position only;
// containment, metadata, navigation and relationships stay compiler-owned.
// No invented connections are needed to keep disconnected VMs in a readable grid.
const directory='.likec4';
rmSync(directory,{recursive:true,force:true});mkdirSync(directory);
const exported=spawnSync('./node_modules/.bin/likec4',['export','json','.','-p','my-infra','-o',`${directory}/automatic.json`],{stdio:'inherit'});
if(exported.status!==0)process.exit(exported.status??1);
const model=JSON.parse(readFileSync(`${directory}/automatic.json`,'utf8'));
const save=view=>writeFileSync(`${directory}/${view.id}.likec4.snap`,JSON.stringify(view,null,2)+'\n');
const byId=view=>new Map(view.nodes.map(n=>[n.id,n]));
function translate(view,node,x,y){
 const map=byId(view),dx=x-node.x,dy=y-node.y;
 function move(n){n.x+=dx;n.y+=dy;for(const id of n.children)move(map.get(id));}
 move(node);
}
function grid(view,parent,columns=3){
 const map=byId(view),children=parent.children.map(id=>map.get(id));
 const gap=24,pad=24,top=52;
 const width=Math.max(...children.map(n=>n.width));
 let y=parent.y+top;
 for(let offset=0;offset<children.length;offset+=columns){
  const row=children.slice(offset,offset+columns),height=Math.max(...row.map(n=>n.height));
  row.forEach((n,i)=>translate(view,n,parent.x+pad+i*(width+gap)+(width-n.width)/2,y+(height-n.height)/2));
  y+=height+gap;
 }
 parent.width=pad*2+Math.min(columns,children.length)*(width+gap)-gap;
 parent.height=y-parent.y;
}
const placement=model.views.placement,map=byId(placement),root=map.get('homeSite.pve');
if(placement.edges.length)throw new Error('Containment grid must not discard communication routes');
const hosts=root.children.map(id=>map.get(id));
for(const host of hosts)grid(placement,host);
root.x=8;root.y=8;let x=root.x+24;
for(const host of hosts){translate(placement,host,x,root.y+52);x+=host.width+36;}
root.width=x-root.x-12;root.height=Math.max(...hosts.map(n=>n.height))+76;
placement.bounds={x:0,y:0,width:root.width+16,height:root.height+16};
save(placement);

// The infrastructure overview has only six summary links. Keep the PVE's
// VM containment grid compact while external providers stay beside the site.
const overview=model.views.index,nodes=byId(overview);
const pve=nodes.get('homeSite.pve');
for(const id of pve.children){const n=nodes.get(id);n.width=300;n.height=112;}
pve.x=500;pve.y=280;grid(overview,pve);
const home=nodes.get('homeSite');home.x=476;home.y=24;home.width=pve.width+48;home.height=pve.height+280;
const network=nodes.get('homeSite.network');Object.assign(network,{x:home.x+24,y:home.y+56,width:300,height:120});
for(const [i,id]of ['homeSite.worker_pi1','homeSite.worker_pi2'].entries())Object.assign(nodes.get(id),{x:home.x+348+i*324,y:home.y+56,width:300,height:120});
const providers=nodes.get('providers');Object.assign(providers,{x:16,y:24,width:332,height:home.height});
for(const [i,id]of ['providers.cloudflare','providers.bitwarden','providers.idrive'].entries())Object.assign(nodes.get(id),{x:32,y:120+i*210,width:300,height:120});
const left=n=>[n.x,n.y+n.height/2],right=n=>[n.x+n.width,n.y+n.height/2],top=n=>[n.x+n.width/2,n.y],bottom=n=>[n.x+n.width/2,n.y+n.height];
const route=(edge,points,label)=>{
 edge.points=points;delete edge.controlPoints;
 Object.assign(edge.labelBBox,{x:label[0],y:label[1],width:116,height:22});
};
for(const edge of overview.edges){
 const source=nodes.get(edge.source),target=nodes.get(edge.target);
 if(edge.source.startsWith('providers.')){
  const a=right(source),b=[home.x,a[1]];
  route(edge,[a,[a[0]+40,a[1]],[b[0]-40,b[1]],b],[a[0]+10,a[1]-26]);
 }else if(edge.target==='providers.idrive'){
  const b=right(target),a=[home.x,b[1]];
  route(edge,[a,[a[0]-40,a[1]],[b[0]+40,b[1]],b],[b[0]+10,b[1]-26]);
 }else if(edge.target==='homeSite.pve'){
  const a=bottom(source),b=[a[0],pve.y];
  route(edge,[a,[a[0],a[1]+20],[b[0],b[1]-20],b],[a[0]+8,a[1]+26]);
 }else if(edge.target==='homeSite.worker_pi1'){
  const a=right(source),b=left(target);
  route(edge,[a,[a[0]+8,a[1]],[b[0]-8,b[1]],b],[a[0]-15,a[1]-26]);
 }else if(edge.target==='homeSite.worker_pi2'){
  const a=top(source),b=top(target),y=home.y+35;
  route(edge,[a,[a[0],y],[b[0],y],b],[a[0]+360,y-24]);
 }else throw new Error(`Unplaced overview route ${edge.source} -> ${edge.target}`);
}
overview.bounds={x:0,y:0,width:home.x+home.width+16,height:home.y+home.height+16};
save(overview);
