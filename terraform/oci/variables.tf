variable "tenancy_ocid" {
  description = "The OCID of the tenancy."
  type        = string
}

variable "compartment_ocid" {
  description = "The OCID of the compartment where resources will be created."
  type        = string
}

variable "user_ocid" {
  description = "The OCID of the user for API authentication."
  type        = string
}

variable "fingerprint" {
  description = "The fingerprint of the API key."
  type        = string
}

variable "private_key_base64" {
  description = "The base64-encoded private key for API authentication."
  type        = string
  sensitive   = true
}

variable "ssh_public_key" {
  description = "The SSH public key to use for worker nodes."
  type        = string
  sensitive   = true
}

variable "alert_email" {
  description = "Email address to receive Budget Alert notifications."
  type        = string
}

variable "region" {
  description = "The OCI region where resources will be created."
  default     = "ap-tokyo-1"
}

variable "cluster_name" {
  description = "The name of the OKE cluster."
  default     = "oke-free-cluster"
}

variable "vcn_cidr" {
  description = "The CIDR block for the VCN."
  default     = "10.0.0.0/16"
}

variable "node_pool_shape" {
  description = "The shape for the worker nodes."
  default     = "VM.Standard.A1.Flex"
}

variable "node_pool_ocpus" {
  description = "OCPUs per worker node. 2 nodes x 1 OCPU = 2 OCPU total for the STG free-tier budget."
  default     = 1
}

variable "node_pool_memory_gbs" {
  description = "Memory GBs per worker node. 2 nodes x 6 GB = 12 GB total for the STG free-tier budget."
  default     = 6
}

variable "node_pool_size" {
  description = "Initial worker node count. Cluster Autoscaler may change this after creation; min/max is configured in the Kubernetes manifest."
  default     = 2
}

# ── Site-to-Site VPN (IX2215 <-> OCI) ────────────────────────────────────────

variable "ix2215_wan_ip" {
  description = "IX2215 の WAN IP (v6plus 固定 IPv4)。OCI CPE リソースに設定する。BSM MIRAKURUN の bsm_ix2215_tunnel_ip と同値。"
  type        = string
}

variable "home_lan_cidr" {
  description = "自宅 LAN の CIDR。OCI DRG がこの宛先を IX2215 へルーティングする。"
  type        = string
  default     = "192.168.0.0/16"
}

variable "ix_public_ipv4" {
  description = "BSM の IX_PUBLIC_IPv4 から取得する、自宅の固定 IPv4 アドレス。OKE API のアクセス制限に使用します。"
  type        = string
}

variable "vpn_psk" {
  description = "IX2215 <-> OCI IPSec トンネルの Pre-Shared Key。TFC に sensitive variable として登録し、IX2215 Ansible 側は BSM VPN_OCI_PSK に同値を登録する。"
  type        = string
  sensitive   = true
}

# ── DB Backup ─────────────────────────────────────────────────────────────────

variable "backup_retention_days" {
  description = "バックアップの保持日数。OCI Object Storage ライフサイクルポリシーで自動削除される。"
  type        = number
  default     = 30
}
