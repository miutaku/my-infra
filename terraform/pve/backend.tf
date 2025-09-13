terraform {
    backend "remote" {
        organization = "miutaku"
        workspaces {
            name = "pve-home"
        }
    }
}