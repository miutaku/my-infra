terraform {
  cloud {
    organization = "miutaku"
    workspaces {
      name = "cloudflare"
    }
  }
}
