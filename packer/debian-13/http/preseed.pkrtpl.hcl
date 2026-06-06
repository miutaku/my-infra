#_preseed_V1
# Debian 13 (trixie) unattended netinst preseed for Packer / Proxmox.
# Mirrors the ubuntu-26-04 autoinstall: single ext4 root, miutaku user with
# NOPASSWD sudo, SSH server, qemu-guest-agent. Password auth stays enabled so
# Packer can connect; it is disabled later by ansible/pbs common role.

### Localization
d-i debian-installer/locale string en_US.UTF-8
d-i keyboard-configuration/xkb-keymap select jp

### Clock / timezone
d-i clock-setup/utc boolean true
d-i time/zone string Asia/Tokyo
d-i clock-setup/ntp boolean true

### Network
d-i netcfg/choose_interface select auto
d-i netcfg/get_hostname string template-debian-13-home-amd64
d-i netcfg/get_domain string home
d-i netcfg/hostname string template-debian-13-home-amd64

### Mirror
d-i mirror/country string manual
d-i mirror/http/hostname string deb.debian.org
d-i mirror/http/directory string /debian
d-i mirror/http/proxy string

### Accounts — disable root login, create miutaku
d-i passwd/root-login boolean false
d-i passwd/make-user boolean true
d-i passwd/user-fullname string miutaku
d-i passwd/username string miutaku
d-i passwd/user-password-crypted password ${ssh_password_hash}
d-i user-setup/allow-password-weak boolean true
d-i user-setup/encrypt-home boolean false

### Partitioning — whole disk, single ext4 root (atomic)
d-i partman-auto/method string regular
d-i partman-auto/choose_recipe select atomic
d-i partman-auto/disk string /dev/sda
d-i partman-lvm/device_remove_lvm boolean true
d-i partman-md/device_remove_md boolean true
d-i partman-partitioning/confirm_write_new_label boolean true
d-i partman/choose_partition select finish
d-i partman/confirm boolean true
d-i partman/confirm_nooverwrite boolean true

### Base system / kernel
d-i base-installer/install-recommends boolean false
d-i base-installer/kernel/image string linux-image-amd64

### apt setup
d-i apt-setup/non-free-firmware boolean true
d-i apt-setup/contrib boolean true
d-i apt-setup/non-free boolean false

### Package selection — minimal + ssh + guest agent
tasksel tasksel/first multiselect ssh-server, standard
d-i pkgsel/include string sudo openssh-server qemu-guest-agent cloud-init cloud-guest-utils vim curl ca-certificates
d-i pkgsel/upgrade select full-upgrade
popularity-contest popularity-contest/participate boolean false

### Bootloader
d-i grub-installer/only_debian boolean true
d-i grub-installer/with_other_os boolean true
d-i grub-installer/bootdev string /dev/sda

### Finish
d-i finish-install/reboot_in_progress note

### Late commands — NOPASSWD sudo, SSH key, enable services
d-i preseed/late_command string \
    echo 'miutaku ALL=(ALL) NOPASSWD:ALL' > /target/etc/sudoers.d/miutaku ; \
    chmod 440 /target/etc/sudoers.d/miutaku ; \
    mkdir -p /target/home/miutaku/.ssh ; \
    echo '${ssh_public_key}' > /target/home/miutaku/.ssh/authorized_keys ; \
    chmod 700 /target/home/miutaku/.ssh ; \
    chmod 600 /target/home/miutaku/.ssh/authorized_keys ; \
    in-target chown -R miutaku:miutaku /home/miutaku/.ssh ; \
    in-target systemctl enable qemu-guest-agent ; \
    in-target systemctl enable ssh
