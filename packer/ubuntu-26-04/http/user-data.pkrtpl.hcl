#cloud-config
autoinstall:
  version: 1
  locale: en_US.UTF-8
  keyboard:
    layout: us
  timezone: Asia/Tokyo
  network:
    network:
      version: 2
      ethernets:
        ens18:
          dhcp4: true
  storage:
    layout:
      name: direct
  identity:
    hostname: ubuntu-template
    username: packer
    password: "${ssh_password_hash}"
  ssh:
    install-server: true
    allow-pw: true
    authorized-keys:
      - "${ssh_public_key}"
  packages:
    - qemu-guest-agent
    - vim
    - cloud-init
    - cloud-initramfs-growroot
  late-commands:
    - curtin in-target -- apt-get remove -y --purge nano
    - curtin in-target -- systemctl enable qemu-guest-agent
