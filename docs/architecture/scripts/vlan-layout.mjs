// Membership is shown by VLAN containment. Only routing crosses boundaries;
// six ordered fan-out curves and a separate WARP route never cross boxes.
export function layoutVlans(view,translate){
 const nodes=new Map(view.nodes.map(n=>[n.id,n])),lan=nodes.get('homeSite.lan'),home=nodes.get('homeSite');
 const columns=['native','management','server','client','guest','iot'].map(id=>nodes.get(`homeSite.lan.${id}`));
 const width=360,gap=24,leafWidth=312,leafHeight=120;
 Object.assign(lan,{x:32,y:232,width:columns.length*(width+gap)-gap+48});
 const height=Math.max(...columns.map(n=>n.children.length))*(leafHeight+20)+64;
 for(const [i,column]of columns.entries()){
  Object.assign(column,{x:lan.x+24+i*(width+gap),y:lan.y+52,width,height});
  column.children.forEach((id,row)=>Object.assign(nodes.get(id),{x:column.x+24,y:column.y+64+row*(leafHeight+20),width:leafWidth,height:leafHeight}));
 }
 lan.height=height+76;
 const router=nodes.get('homeSite.ix2215');Object.assign(router,{x:lan.x+lan.width/2-360,y:48,width:720,height:120});
 Object.assign(home,{x:8,y:8,width:lan.x+lan.width+16,height:lan.y+lan.height+16});
 for(const edge of view.edges.filter(e=>e.source===router.id)){
  const target=nodes.get(edge.target),i=columns.indexOf(target);
  if(i<0)throw new Error(`Unexpected VLAN route ${edge.target}`);
  const start=[router.x+router.width*(i+1)/(columns.length+1),router.y+router.height],end=[target.x+target.width/2,target.y];
  edge.points=[start,[start[0],start[1]+52],[end[0],end[1]-52],end];delete edge.controlPoints;
  Object.assign(edge.labelBBox,{x:end[0]-62,y:end[1]-28,width:124,height:22});
 }
 const server=nodes.get('homeSite.lan.server'),providers=nodes.get('providers'),warp=nodes.get('providers.warp');
 Object.assign(providers,{x:server.x-16,y:home.y+home.height+96,width:392,height:176});
 Object.assign(warp,{x:server.x+24,y:providers.y+52,width:312,height:104});
 const route=view.edges.find(e=>e.source===warp.id);
 if(!route)throw new Error('WARP private route is missing');
 const start=[warp.x+warp.width/2,warp.y],end=[server.x+server.width/2,server.y+server.height];
 route.points=[start,[start[0],start[1]-32],[end[0],end[1]+32],end];delete route.controlPoints;
 Object.assign(route.labelBBox,{x:end[0]+12,y:home.y+home.height+24,width:260,height:44});
 if(view.edges.length!==7)throw new Error('VLAN view must contain only six router interfaces and WARP');
 view.bounds={x:0,y:0,width:home.x+home.width+16,height:providers.y+providers.height+16};
 return view;
}
