#!/bin/bash
set -e

# Variables passed from Terraform
GITHUB_ORG="${github_org}"
RUNNER_TOKEN="${runner_token}"
RUNNER_NAME="${runner_name}"
RUNNER_LABELS="${runner_labels}"
RUNNER_VERSION="2.321.0"

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
