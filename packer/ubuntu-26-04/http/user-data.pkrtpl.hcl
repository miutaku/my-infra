#cloud-config
autoinstall:
  version: 1
  locale: en_US.UTF-8
  keyboard:
    layout: jp
  timezone: Asia/Tokyo
  network:
    version: 2
    ethernets:
      any:
        match:
          name: "en*"
        dhcp4: true
  storage:
    layout:
      name: direct
  identity:
    hostname: template-ubuntu-26-04-home-amd64
    username: miutaku
    password: "${ssh_password_hash}"
  ssh:
    install-server: true
    allow-pw: true
    authorized-keys:
      - "${ssh_public_key}"
  late-commands:
    - echo 'miutaku ALL=(ALL) NOPASSWD:ALL' > /target/etc/sudoers.d/miutaku
    - chmod 440 /target/etc/sudoers.d/miutaku
    - curtin in-target -- apt install -y qemu-guest-agent
    - curtin in-target -- systemctl enable qemu-guest-agent
    - curtin in-target -- sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config # cloudn't build `allow-pw: false` image without this workaround, maybe a cloud-init bug?
