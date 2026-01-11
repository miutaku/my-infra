#!/bin/bash
set -e

# Variables passed from Terraform
PROJECT_ID="${project_id}"
GITHUB_ORG="${github_org}"
SECRET_NAME="${secret_name}"
RUNNER_NAME="${runner_name}"
RUNNER_LABELS="${runner_labels}"
RUNNER_VERSION="${runner_version}"

# Create runner user
useradd -m -s /bin/bash runner || true

# Install dependencies
apt-get update
apt-get install -y curl jq git docker.io

# Add runner user to docker group
usermod -aG docker runner

# Enable and start Docker
systemctl enable docker
systemctl start docker

# Fetch runner token from Secret Manager (secure method)
RUNNER_TOKEN=$(curl -s "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token" \
  -H "Metadata-Flavor: Google" | jq -r '.access_token' | \
  xargs -I {} curl -s "https://secretmanager.googleapis.com/v1/projects/$${PROJECT_ID}/secrets/$${SECRET_NAME}/versions/latest:access" \
  -H "Authorization: Bearer {}" | jq -r '.payload.data' | base64 -d)

# Create runner directory
RUNNER_DIR="/home/runner/actions-runner"
mkdir -p $RUNNER_DIR
cd $RUNNER_DIR

# Download GitHub Actions Runner
curl -o actions-runner-linux-x64.tar.gz -L \
  "https://github.com/actions/runner/releases/download/v$${RUNNER_VERSION}/actions-runner-linux-x64-$${RUNNER_VERSION}.tar.gz"

tar xzf actions-runner-linux-x64.tar.gz
rm actions-runner-linux-x64.tar.gz

# Change ownership
chown -R runner:runner $RUNNER_DIR

# Configure the runner as the runner user (Organization level)
sudo -u runner ./config.sh \
  --url "https://github.com/$${GITHUB_ORG}" \
  --token "$${RUNNER_TOKEN}" \
  --name "$${RUNNER_NAME}" \
  --labels "$${RUNNER_LABELS}" \
  --unattended \
  --replace

# Install and start the runner service
./svc.sh install runner
./svc.sh start

echo "GitHub Actions Runner setup complete!"
