mock_provider "grafana" {
  mock_data "grafana_data_source" {
    defaults = { uid = "mock-prometheus", type = "prometheus" }
  }
}

variables {
  contact_points = { warn = "test-warn", critical = "test-critical" }
  environments = {
    home = {
      datasource_uid = "home-metrics"
      cluster        = "home-k8s"
      profile        = "home"
      features       = ["kubernetes", "probes", "backups"]
    }
    stg = {
      datasource_uid = "stg-metrics"
      cluster        = "oke-stg"
      profile        = "oke"
      features       = ["kubernetes"]
      paused         = true
    }
    prd = {
      datasource_uid = "prd-metrics"
      cluster        = "oke-prd"
      profile        = "oke"
      features       = ["kubernetes"]
      paused         = true
    }
  }
}

run "all_environments" {
  command = plan

  assert {
    condition = (
      contains(keys(output.rule_uids["home"]), "ups-shutdown-near") &&
      contains(keys(output.rule_uids["home"]), "backup-db-critical") &&
      contains(keys(output.rule_uids["home"]), "missing-ups-a-status") &&
      contains(keys(output.rule_uids["stg"]), "oke-node-none") &&
      !contains(keys(output.rule_uids["prd"]), "ups-shutdown-near")
    )
    error_message = "Environment-specific monitoring coverage was lost or mixed."
  }

  assert {
    condition     = output.rule_uids["stg"]["cpu-busy"] != output.rule_uids["prd"]["cpu-busy"]
    error_message = "Rule UIDs must not collide across environments."
  }

  assert {
    condition = (
      output.rule_settings["stg"]["oke-node-none"].severity == "warn" &&
      output.rule_settings["prd"]["oke-node-none"].severity == "critical" &&
      output.rule_settings["stg"]["oke-metrics-down"].severity == "critical" &&
      output.rule_settings["home"]["ups-shutdown-near"].receiver == "test-critical" &&
      output.rule_settings["home"]["ups-on-battery"].receiver == "test-warn" &&
      output.rule_settings["home"]["ups-shutdown-near"].interval == 10 &&
      alltrue(flatten([for env in values(output.rule_settings) : [for rule in values(env) : rule.paused]]))
    )
    error_message = "Severity, notification routing, fast UPS evaluation or initial pause is incorrect."
  }
}

run "existing_collectors_only" {
  command = plan
  variables {
    environments = {
      home = {
        datasource_uid = "home-metrics"
        cluster        = "home-k8s"
        profile        = "home"
        features       = []
      }
    }
  }
  assert {
    condition = (
      !contains(keys(output.rule_uids["home"]), "backup-db-critical") &&
      !contains(keys(output.rule_uids["home"]), "control-plane-quorum") &&
      !contains(keys(output.rule_uids["home"]), "missing-home-k8s-api") &&
      contains(keys(output.rule_uids["home"]), "ups-shutdown-near")
    )
    error_message = "Rules must not be created before their collectors are enabled."
  }
}

run "enable_home_without_enabling_unhealthy_oke_paths" {
  command = plan
  variables {
    paused = false
  }
  assert {
    condition = (
      !output.rule_settings["home"]["ups-shutdown-near"].paused &&
      output.rule_settings["stg"]["oke-metrics-down"].paused &&
      output.rule_settings["prd"]["oke-metrics-down"].paused
    )
    error_message = "Enabling one environment must not enable paused environments."
  }
}

run "reject_shared_datasource" {
  command = plan
  variables {
    environments = {
      stg = { datasource_uid = "shared", cluster = "oke-stg", profile = "oke", features = [] }
      prd = { datasource_uid = "shared", cluster = "oke-prd", profile = "oke", features = [] }
    }
  }
  expect_failures = [var.environments]
}

run "reject_backups_without_collector" {
  command = plan
  variables {
    environments = {
      home = { datasource_uid = "home", cluster = "home-k8s", profile = "home", features = ["backups"] }
    }
  }
  expect_failures = [var.environments]
}
