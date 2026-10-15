// Diagram scope follows the user-defined ownership boundary, not the source repository.
// OCI/OKE, including management workloads there, is delegated to the Re:Venter diagram.
// This PVC is also mounted by the my-infra Codex runner using its own subPath.
const sharedDeclarations=new Set(['k8s/pve/arc-runners/reventer-cache-pvc.yaml']);
export function isReventerDedicated({file,name=''}){
 if(sharedDeclarations.has(file))return false;
 if(file.startsWith('terraform/oci')||file.startsWith('k8s/oci/')||file.startsWith('k8s/oci-prd/'))return true;
 if(file.startsWith('k8s/pve/reventer-')||file.startsWith('k8s/pve/architecture-review/'))return true;
 if(file==='terraform/cloudflare/architecture-review.tf')return true;
 return /(?:^|[-_])reventer(?:$|[-_])/.test(name)||name==='architecture-review'||name==='argo-rollouts-prd'||name.startsWith('oci-prd-');
}
