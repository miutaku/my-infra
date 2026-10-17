resource "grafana_message_template" "monitoring" {
  name     = "my-infra.notifications"
  template = file("${path.module}/templates/notifications.tmpl")
}

# Provider 4.46.0 models Discord integrations as a set with computed UIDs.
# Changing message/title creates a new integration (verified with a fake API).
# Use a narrowly scoped PUT of the existing UID instead, only during apply.
# No destroy provisioner: reverting/removing Terraform must never delete a route.
resource "terraform_data" "discord_format" {
  for_each = var.contact_points
  input = {
    name    = each.value
    uid     = var.discord_receiver_uids[each.key]
    title   = "{{ template \"my-infra.title\" . }}"
    message = "{{ template \"my-infra.message\" . }}"
    # Include the implementation so a fix is deployed on the next approved apply.
    updater = filesha256("${path.module}/../../scripts/grafana-notifications.py")
  }
  triggers_replace = [
    each.value,
    var.discord_receiver_uids[each.key],
    "{{ template \"my-infra.title\" . }}",
    "{{ template \"my-infra.message\" . }}",
    filesha256("${path.module}/../../scripts/grafana-notifications.py"),
  ]

  provisioner "local-exec" {
    command = "python3 ${path.module}/../../scripts/grafana-notifications.py configure --apply"
    environment = {
      GRAFANA_NOTIFICATION_CONFIG = jsonencode(self.input)
    }
  }
  depends_on = [grafana_message_template.monitoring]
}
