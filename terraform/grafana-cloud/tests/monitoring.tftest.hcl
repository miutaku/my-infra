mock_provider "grafana" {
  mock_data "grafana_data_source" {
    defaults = { uid = "mock-prometheus", type = "prometheus" }
  }
}

variables {
  discord_receiver_uids = { warn = "test-warn", critical = "test-critical" }
  contact_points        = { warn = "test-warn", critical = "test-critical" }
  environments = {
    home = {
      datasource_uid = "home-metrics"
      cluster        = "home-k8s"
      features       = ["kubernetes", "probes", "backups"]
    }
  }
}

run "home_monitoring" {
  command = plan

  assert {
    condition = (
      contains(keys(output.rule_uids["home"]), "ups-shutdown-near") &&
      contains(keys(output.rule_uids["home"]), "backup-db-critical") &&
      contains(keys(output.rule_uids["home"]), "missing-ups-a-status") &&
      length(output.rule_uids) == 1
    )
    error_message = "Only home infrastructure monitoring should be provisioned."
  }

  assert {
    condition = (
      output.rule_settings["home"]["ups-shutdown-near"].receiver == "test-critical" &&
      output.rule_settings["home"]["ups-on-battery"].receiver == "test-warn" &&
      output.rule_settings["home"]["loockit-unavailable-warn"].receiver == "test-warn" &&
      output.rule_settings["home"]["loockit-unavailable-critical"].receiver == "test-critical" &&
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

run "enable_home" {
  command = plan
  variables {
    paused = false
  }
  assert {
    condition = (
      !output.rule_settings["home"]["ups-shutdown-near"].paused &&
      length(output.rule_settings) == 1
    )
    error_message = "Only home rules should be enabled."
  }
}

run "reject_unmanaged_environment" {
  command = plan
  variables {
    environments = {
      other = { datasource_uid = "unmanaged", cluster = "unmanaged", features = [] }
    }
  }
  expect_failures = [var.environments]
}

run "reject_backups_without_collector" {
  command = plan
  variables {
    environments = {
      home = { datasource_uid = "home", cluster = "home-k8s", features = ["backups"] }
    }
  }
  expect_failures = [var.environments]
}

run "functional_monitoring" {
  command = plan
  variables {
    environments = {
      home = {
        datasource_uid = "home-metrics"
        cluster        = "home-k8s"
        features       = ["kubernetes", "probes", "backups", "access", "storage_api", "database", "recording", "backup_integrity", "control_plane", "network", "operations"]
      }
    }
  }
  assert {
    condition = (
      contains(keys(output.rule_uids["home"]), "access-service-failed") &&
      contains(keys(output.rule_uids["home"]), "missing-functional-access-tnlastation-staging") &&
      contains(keys(output.rule_uids["home"]), "missing-deploy-tfc-agent") &&
      contains(keys(output.rule_uids["home"]), "backup-restore-stale-pbs-vm-13201") &&
      output.rule_settings["home"]["network-required-port-down"].receiver == "test-critical" &&
      output.rule_settings["home"]["nas-pool-capacity-warn"].receiver == "test-warn"
    )
    error_message = "Functional monitoring must include Access, fixed required telemetry, VM restore reporting and severity routing."
  }
}

run "reject_integrity_without_job_collector" {
  command = plan
  variables {
    environments = {
      home = { datasource_uid = "home", cluster = "home-k8s", features = ["backup_integrity"] }
    }
  }
  expect_failures = [var.environments]
}

run "reject_control_plane_without_probes" {
  command = plan
  variables {
    environments = {
      home = { datasource_uid = "home", cluster = "home-k8s", features = ["control_plane"] }
    }
  }
  expect_failures = [var.environments]
}

run "shared_notification_format" {
  command = plan
  assert {
    condition = (
      grafana_message_template.monitoring.name == "my-infra.notifications" &&
      grafana_message_template.monitoring.template == file("templates/notifications.tmpl") &&
      terraform_data.discord_format["warn"].input.message == terraform_data.discord_format["critical"].input.message &&
      terraform_data.discord_format["warn"].input.uid == "test-warn" &&
      terraform_data.discord_format["critical"].input.uid == "test-critical"
    )
    error_message = "Both existing severity receivers must use one shared template and verified UIDs."
  }
}
