# Existing Re:Venter data source UIDs and converted Integration rules are managed
# by a narrow reconciler. It preserves stored credentials, stages replacements,
# validates both PDC paths, and pauses the old generation without deleting it.
# No destroy provisioner: removal must never delete data sources or alert rules.
resource "terraform_data" "reventer_observability" {
  input = {
    catalog = filesha256("${path.module}/reventer-catalog.json")
    updater = filesha256("${path.module}/../../scripts/reconcile-reventer-grafana.py")
  }
  triggers_replace = [
    filesha256("${path.module}/reventer-catalog.json"),
    filesha256("${path.module}/../../scripts/reconcile-reventer-grafana.py"),
  ]
  provisioner "local-exec" {
    command = "python3 ${path.module}/../../scripts/reconcile-reventer-grafana.py apply && python3 ${path.module}/../../scripts/reconcile-reventer-grafana.py check"
  }
  depends_on = [terraform_data.discord_format]
}
