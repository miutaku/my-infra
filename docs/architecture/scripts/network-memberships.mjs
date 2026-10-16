import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {parseAllDocuments} from 'yaml';
const q=value=>JSON.stringify(String(value));
const segments={main:'native',vlan10:'management',vlan20:'server',vlan30:'client',guest:'guest',vlan40:'iot'};
// Project NIC memberships from canonical placement into a network perspective.
// DHCP reservations describe configured assignments, never observed liveness.
export function networkMemberships(root,guests){
 const read=file=>readFileSync(resolve(root,file),'utf8'),sourceFile='ansible/ix2215/group_vars/all.yml',source=read(sourceFile);
 const config=parseAllDocuments(source)[0].toJS(),names=new Map([...source.matchAll(/^\s*-\s*\{ ip: "([^"]+)"[^}\n]*\}\s*#\s*(.+)$/gm)].map(m=>[m[1],m[2]]));
 const profiles=new Map(config.ix_dhcp_profiles.map(p=>[segments[p.name],p])),blocks=[];
 const metadata=values=>'metadata { '+Object.entries(values).map(([key,value])=>`${key} ${q(value)}`).join(' ')+' }';
 function node(segment,id,title,description,values={},element){
  blocks.push(`extend homeSite.lan.${segment} { ${element?`${id} = instanceOf ${element}`:`networkGroup ${id}`} ${q(title)} { description ${q(description)} ${metadata({sourceFile,...values})} } }`);
 }
 for(const [segment,profile]of profiles){
  const reservations=(profile.fixed_assignments??[]).map(row=>({ip:row.ip}));
  const prefix=profile.assignable_range.split(' ')[0].split('.').slice(0,3).join('.')+'.';
  const gateway=config.ix_interfaces.find(i=>i.ip_address?.startsWith(prefix));
  if(!gateway)throw new Error(`Missing VLAN gateway: ${segment}`);
  blocks.push(`extend homeSite.lan.${segment} { ${metadata({sourceFile,gateway:gateway.ip_address,routeInterface:gateway.name,dhcpRange:profile.assignable_range,dhcpReservations:JSON.stringify(reservations)})} }`);
  const members=guests.filter(g=>g.segment===segment);
  if(members.length){
   const roles=[...new Set(members.map(g=>g.poolTitle))];
   const title={native:'UniFi OS',server:'Proxmox / サーバ基盤',client:'Windows / 作業環境',iot:'MagicMirror / 表示端末'}[segment];
   node(segment,'pve',title,segment==='server'?'home-k8s・LB・NAS・PBS\nLoockit・Mirakurun・開発':roles.join('・'),{sourceFile:'docs/architecture/deployment.c4',drillDown:'placement',placementRefs:members.map(g=>g.ref).join(','),guestCount:members.length},'premises.pve');
  }
 }
 const addresses=(segment,pattern)=>(profiles.get(segment).fixed_assignments??[]).filter(row=>pattern.test(names.get(row.ip)??'')).map(row=>row.ip);
 const add=(segment,id,title,pattern,view,element)=>{
  const ips=addresses(segment,pattern);if(!ips.length)throw new Error(`Missing network members: ${id}`);
  node(segment,id,title,ips.join(' / '),{addresses:ips.join(','),...(view?{drillDown:view}:{})},element);
 };
 add('native','pve_management','Proxmox VE / 2ノード管理',/^pve-/,'placement','premises.pve');
 add('native','switch','US-8-60W / 管理IP',/^US-8-60W/,'network','premises.hardware.network.switch');
 add('native','ap','FS AP / 管理IP',/^FS AP/,'network','premises.hardware.network.ap');
 const rpiSource='talos/home-k8s/scripts/label-nodes',rpiIPs=[...read(rpiSource).matchAll(/^label_rpi_by_ip (\S+)/gm)].map(m=>m[1]);
 if(rpiIPs.length!==2)throw new Error('Expected both Raspberry Pi worker addresses');
 node('management','rpi_workers','Raspberry Pi / worker03・04',rpiIPs.join(' / '),{sourceFile:rpiSource,drillDown:'home_apps',canonicalRef:'homeSite.workers',addresses:rpiIPs.join(',')},'premises.hardware.rpi_workers');
 add('management','nut','NUT Pi / UPS監視',/RPiB\+ eth0/,'power');
 add('management','kvm','NanoKVM ×2',/nanokvm/,'placement','premises.hardware.kvm');
 add('management','management_clients','管理端末 / NUCBox・NIC',/nucbox|CE LINK/);
 add('client','physical_clients','PC・クライアント端末',/gaming-pc|PLANEX|BUFFALO|謎NIC/);
 add('client','wol','WoL relay / Raspberry Pi',/wol-pi/);
 add('iot','av','TV・ゲーム機',/Nintendo|BRAVIA|Wii/);
 const smartIPs=addresses('iot',/smart remocon|ceiling light|security camera|SESAME|Tuya/);
 node('iot','smart_home','スマートホーム','照明・リモコン・カメラ\nSESAME・プラグ・センサー',{addresses:smartIPs.join(',')});
 node('guest','clients','来客端末 / DHCP','他VLANへの横断を拒否',{addresses:'DHCP'});
 const pool=parseAllDocuments(read('k8s/pve/metallb/metallb.yaml')).map(d=>d.toJS()).find(d=>d?.kind==='IPAddressPool').spec.addresses;
 node('server','service_ips','MetalLB / Service IP',pool.join(' / '),{sourceFile:'k8s/pve/metallb/metallb.yaml',drillDown:'platform'},'premises.home.dns.metallb');
 const vipSource='talos/home-k8s/patches/controlplane-vip.yaml',apiVIP=parseAllDocuments(read(vipSource))[0].toJS().machine.network.interfaces[0].vip.ip;
 const lbVIP=parseAllDocuments(read('ansible/load-balancer/group_vars/all'))[0].toJS().lb.vip;
 node('server','vips','API・ロードバランサー VIP',`Kubernetes API: ${apiVIP}\nHAProxy: ${lbVIP}`,{sourceFile:vipSource,lbSource:'ansible/load-balancer/group_vars/all',drillDown:'platform'});
 blocks.push('extend providers { warp = instanceOf external.edge.warp "Cloudflare WARP" { metadata { drillDown "network" } } }');
 return blocks.join('\n');
}
