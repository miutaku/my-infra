terraform {
  cloud {
    organization = "miutaku"
    workspaces {
      name = "pve-home"
    }
  }
}
