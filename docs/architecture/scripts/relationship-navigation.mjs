// Navigation targets for inventory links and deployment-node drill-down.
export function targetView(fqn) {
 if(fqn.startsWith('premises.hardware.network'))return 'network';
 if(fqn.startsWith('premises.home.platform'))return 'platform';
 if(fqn==='premises.hardware.x570')return 'pve_x570';
 if(fqn==='premises.hardware.b550m')return 'pve_b550m';
 if(fqn.startsWith('premises.home.apps.loockit'))return 'loockit';
 if(fqn.startsWith('premises.home.apps.coupon_manager'))return 'coupon';
 if(fqn.startsWith('premises.home.recording'))return 'recording';
 if(fqn.startsWith('premises.home.nextcloud'))return 'nextcloud';
 if(fqn.startsWith('premises.home.apps'))return 'home_apps';
 if(fqn.startsWith('premises.hardware.ups'))return 'power';
 if(fqn.startsWith('premises.lan')||fqn.startsWith('premises.hardware.network.router')||fqn.startsWith('premises.home.dns')||fqn.startsWith('external.edge.warp'))return 'network';
 if(fqn.startsWith('premises.data')||fqn==='external.idrive')return 'storage';
 if(fqn.startsWith('external.edge')&&!fqn.startsWith('external.edge.warp'))return 'access';
 if(fqn==='external.bws'||fqn.endsWith('.eso'))return 'secrets';
 if(fqn==='external.github'||fqn==='external.terraform_cloud')return 'delivery';
 if(fqn.startsWith('consumers'))return 'index';
 if(fqn.startsWith('premises.management'))return 'delivery';
 if(fqn==='external.grafana'||fqn==='premises.home.agent')return 'observability';
 if(fqn.startsWith('premises.hardware')||fqn.startsWith('premises.data'))return 'placement';
 return 'home_apps';
}
// LikeC4 1.59.4 drops deployment-node navigateTo while compiling views.
// Keep the host drill-down usable in the shell until native deployment navigation works.
export function deploymentTarget(ref){
 if(/\.(cp[123]|worker[12])\.talos$/.test(ref))return 'platform';
 if(/\.loockit(?:\.app)?$/.test(ref))return 'loockit';
 if(/\.tuner(?:\.app)?$/.test(ref))return 'recording';
 if(/\.(nas[12]|pbs)$/.test(ref))return 'storage';
 if(/\.unifi(?:\.app)?$/.test(ref))return 'network';
 return {'homeSite.x570':'pve_x570','homeSite.b550m':'pve_b550m','homeSite.talos':'home_apps','homeSite.network':'network'}[ref]??null;
}
