locals {
  ubuntu_template    = "template-ubuntu-26-04-home-amd64"
  debian_template    = "template-debian-13-home-amd64"
  truenas_template   = "template-nas-truenas-scale-23-10-home-amd64"
  mm_server_template = "template-mm-server-ubuntu-26-04-amd64"
  all_nodes          = ["pve-x570", "pve-b550m"]
}
