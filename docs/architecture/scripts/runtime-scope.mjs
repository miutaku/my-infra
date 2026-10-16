// Cluster bootstrap components have no ArgoCD Application. References are explicit.
export const bootstrapWorkloads = [
 {namespace:'kube-system',kind:'DaemonSet',name:'kube-flannel',modelRef:'premises.home.platform.flannel'},
 {namespace:'kube-system',kind:'DaemonSet',name:'kube-proxy',modelRef:'premises.home.platform.kube_proxy'},
 {namespace:'kube-system',kind:'Deployment',name:'coredns',modelRef:'premises.home.platform.cluster_dns'},
 {namespace:'kube-system',kind:'Deployment',name:'metrics-server',modelRef:'premises.home.platform.metrics_server'},
 {namespace:'kubelet-serving-cert-approver',kind:'Deployment',name:'kubelet-serving-cert-approver',modelRef:'premises.home.platform.cert_approver'},
];
