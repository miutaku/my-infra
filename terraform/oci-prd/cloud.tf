terraform {
  cloud {
    organization = "reventer"
    workspaces {
      name = "oci-prd"
    }
  }
}
