terraform {
  cloud {
    organization = "miutaku"
    workspaces {
      name = "my-infra"
    }
  }
}
