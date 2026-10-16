import {layoutPvePools} from './pve-layout.mjs';
// Keep the full NIC inventory readable without inventing network hops.
export function layoutVlans(view,translate,grid){
 const nodes=new Map(view.nodes.map(n=>[n.id,n]));
 const home=nodes.get('homeSite'),pve=nodes.get('homeSite.pve');
 for(const node of view.nodes.filter(n=>n.id.startsWith('homeSite.pve.')&&n.children.length===0))Object.assign(node,{width:260,height:96});
 pve.x=352;pve.y=80;layoutPvePools(view,translate,grid);
 const lan=nodes.get('homeSite.lan'),router=nodes.get('homeSite.ix2215');
 lan.x=pve.x+pve.width+224;lan.y=232;lan.width=368;
 Object.assign(router,{x:lan.x+24,y:80,width:320,height:144});
 let segmentY=lan.y+52;
 for(const name of ['native','server','client','iot','management','guest']){
  const node=nodes.get(`homeSite.lan.${name}`);Object.assign(node,{x:lan.x+24,y:segmentY,width:320,height:name==='server'?200:104});segmentY+=node.height+24;
 }
 lan.height=segmentY-lan.y;
 home.x=328;home.y=24;home.width=lan.x+lan.width+148-home.x;home.height=Math.max(pve.y+pve.height,segmentY)-home.y+24;
 // Graphviz cubic point format; straight sections follow the clear row gaps.
 function path(corners){
  return corners.flatMap((b,i)=>{
   if(i===0)return [b];const a=corners[i-1];
   return [[a[0]+(b[0]-a[0])/3,a[1]+(b[1]-a[1])/3],[a[0]+2*(b[0]-a[0])/3,a[1]+2*(b[1]-a[1])/3],b];
  });
 }
 const providers=nodes.get('providers'),cloudflare=nodes.get('providers.cloudflare');
 Object.assign(providers,{x:8,y:24,width:300,height:190});Object.assign(cloudflare,{x:24,y:76,width:268,height:120});
 const warp=view.edges.find(e=>e.source===cloudflare.id);
 if(warp){
  const target=nodes.get(warp.target),start=[cloudflare.x+cloudflare.width,cloudflare.y+cloudflare.height/2],bus=lan.x-12,end=[target.x,target.y+8];
  warp.points=path([start,[312,start[1]],[312,48],[bus,48],[bus,end[1]],end]);delete warp.controlPoints;
  Object.assign(warp.labelBBox,{x:home.x+80,y:44,width:360,height:22});
 }
 const guestEdges=view.edges.filter(e=>e.source.startsWith('homeSite.pve.'));
 const ports=new Map();let lane=0;
 for(const edge of guestEdges){
  const source=nodes.get(edge.source),target=nodes.get(edge.target);
  const count=guestEdges.filter(e=>e.target===edge.target).length,port=(ports.get(edge.target)??0)+1;ports.set(edge.target,port);
  const end=[target.x,target.y+target.height*port/(count+1)],start=[source.x+source.width,source.y+source.height/2];
  const rowGap=source.y+source.height+8+(lane%4)*4,bus=pve.x+pve.width+24+lane++*7;
  edge.points=path([start,[start[0]+10,start[1]],[start[0]+10,rowGap],[bus,rowGap],[bus,end[1]],end]);delete edge.controlPoints;
 }
 let routerLane=0;
 for(const edge of view.edges.filter(e=>e.source===router.id)){
  const target=nodes.get(edge.target),start=[router.x+router.width,router.y+router.height/2],end=[target.x+target.width,target.y+target.height/2],bus=lan.x+lan.width+18+routerLane++*12;
  edge.points=path([start,[bus,start[1]],[bus,end[1]],end]);delete edge.controlPoints;
  Object.assign(edge.labelBBox,{x:lan.x+lan.width+18,y:end[1]-26,width:108,height:22});
 }
 view.bounds={x:0,y:0,width:home.x+home.width+16,height:home.y+home.height+16};
 return view;
}
