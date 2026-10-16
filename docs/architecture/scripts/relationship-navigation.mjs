// Navigation targets for inventory links and deployment-node drill-down.
export function targetView(fqn) {
 if(fqn.startsWith('premises.hardware.network'))return 'network';
 if(fqn.startsWith('premises.home.platform'))return 'platform';
 if(fqn==='premises.pve.x570')return 'placement';
 if(fqn==='premises.pve.b550m')return 'placement';
 if(fqn.startsWith('premises.home.loockit'))return 'loockit';
 if(fqn.startsWith('premises.home.coupon_manager'))return 'home_apps';
 if(fqn.startsWith('premises.home.recording'))return 'recording';
 if(fqn.startsWith('premises.home.nextcloud'))return 'nextcloud';
 if(fqn.startsWith('premises.hardware.ups'))return 'power';
 if(fqn.startsWith('premises.lan')||fqn.startsWith('premises.hardware.network.router')||fqn.startsWith('premises.home.dns')||fqn.startsWith('external.edge.warp'))return 'network';
 if(/^premises\.pve\.(nas01|nas02|pbs)/.test(fqn)||fqn.startsWith('premises.home.databases')||fqn.startsWith('premises.home.backups')||fqn.startsWith('premises.home.shared')||fqn==='external.idrive')return 'storage';
 if(fqn.startsWith('external.edge')&&!fqn.startsWith('external.edge.warp'))return 'access';
 if(fqn==='external.bws'||fqn.endsWith('.eso'))return 'secrets';
 if(fqn==='external.github'||fqn==='external.terraform_cloud')return 'delivery';
 if(fqn.startsWith('consumers'))return 'index';
 if(fqn.startsWith('premises.management')||fqn.startsWith('premises.home.management'))return 'delivery';
 if(fqn==='external.grafana'||fqn==='premises.home.agent')return 'observability';
 if(fqn.startsWith('premises.hardware')||fqn.startsWith('premises.pve'))return 'placement';
 return 'home_apps';
}
// LikeC4 1.59.4 drops deployment-node navigateTo while compiling views.
// Keep the host drill-down usable in the shell until native deployment navigation works.
export function deploymentTarget(ref){
 if(/^homeSite\.pve\.[^.]+$/.test(ref))return 'placement';
 if(/\.(cp[123]|worker[12])(?:\.talos)?$/.test(ref)||/\.worker_pi[12](?:\.talos)?$/.test(ref))return 'home_apps';
 if(/\.loockit[12]?(?:\.app)?$/.test(ref))return 'loockit';
 if(/\.tuner(?:_prod|_stg)?(?:\.app)?$/.test(ref))return 'recording';
 if(/\.(nas[12]|pbs)$/.test(ref))return 'storage';
 if(/\.unifi(?:\.app)?$/.test(ref))return 'network';
 return {'homeSite.pve':'placement','homeSite.workers':'home_apps','homeSite.pve.controlplanes':'home_apps','homeSite.talos':'home_apps','homeSite.network':'network','homeSite.ix2215':'network','providers.cloudflare':'access','providers.bitwarden':'secrets','providers.idrive':'storage'}[ref]??null;
}
