terraform {
  cloud {
    organization = "miutaku"
    workspaces {
      name = "oci-prd"
    }
  }
}
