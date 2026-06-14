locals {
  common_tags = {
    "managed-by" = "terraform"
    "repository" = "miutaku/my-infra"
  }
}

data "http" "cloudflare_ipv4" {
  url = "https://www.cloudflare.com/ips-v4"
  request_headers = {
    Accept = "text/plain"
  }
}

locals {
  cloudflare_ipv4_ranges = [for cidr in split("\n", trimspace(data.http.cloudflare_ipv4.response_body)) : cidr if cidr != ""]
}
