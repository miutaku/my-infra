resource "oci_budget_budget" "always_free_budget" {
  compartment_id = var.tenancy_ocid
  amount         = 1
  reset_period   = "MONTHLY"
  target_type    = "COMPARTMENT"
  targets        = [var.compartment_ocid]
  display_name   = "always-free-budget"
  description    = "Alert when any actual spend occurs against the Always Free compartment."
  freeform_tags  = local.common_tags
}

resource "oci_budget_alert_rule" "one_percent_alert" {
  budget_id      = oci_budget_budget.always_free_budget.id
  threshold      = 1
  threshold_type = "PERCENTAGE"
  type           = "ACTUAL"
  display_name   = "1-percent-actual-alert"
  recipients     = var.alert_email
  message        = "OCI actual spend has exceeded 1% of the $1 monthly budget. Verify Always Free limits are not breached."
}
