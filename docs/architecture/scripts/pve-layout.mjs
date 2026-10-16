// Use the same role boundaries and order in inventory and network views.
export function layoutPvePools(view,translate,grid){
 const nodes=new Map(view.nodes.map(n=>[n.id,n])),pve=nodes.get('homeSite.pve');
 const rows=[['controlplanes','workers'],['loadbalancers','storage'],['smartlocks','tuners'],['network_management','development','desktop','display']].map(row=>row.map(id=>nodes.get(`homeSite.pve.${id}`)));
 const arranged=new Set(rows.flat().map(n=>n.id)),extra=pve.children.filter(id=>!arranged.has(id)).map(id=>nodes.get(id));
 for(let i=0;i<extra.length;i+=2)rows.push(extra.slice(i,i+2));
 for(const row of rows)for(const pool of row)grid(view,pool,Math.min(3,pool.children.length));
 pve.width=Math.max(...rows.map(row=>row.reduce((sum,n)=>sum+n.width,0)+(row.length-1)*24))+48;
 let y=pve.y+52;
 for(const row of rows){
  const height=Math.max(...row.map(n=>n.height));let x=pve.x+24;
  for(const pool of row){translate(view,pool,x,y);pool.height=height;x+=pool.width+24;}
  y+=height+24;
 }
 pve.height=y-pve.y;
 return pve;
}
