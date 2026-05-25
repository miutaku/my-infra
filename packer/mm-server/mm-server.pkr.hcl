packer {
  required_plugins {
    proxmox = {
      version = ">= 1.2.3"
      source  = "github.com/hashicorp/proxmox"
    }
  }
}

# template-ubuntu-26-04-home-amd64 をベースにcloneしてmm-server専用テンプレートを作る。
# ISOインストールは不要なのでproxmox-cloneを使う。
source "proxmox-clone" "mm-server" {
  proxmox_url              = var.proxmox_url
  username                 = var.proxmox_token_id
  token                    = var.proxmox_token_secret
  insecure_skip_tls_verify = true
  node                     = var.proxmox_node

  vm_name    = var.template_name
  vm_id      = var.vmid
  clone_vm   = var.clone_template
  full_clone = true

  cores    = var.cpu_cores
  memory   = var.memory
  cpu_type = "host"
  os       = "l26"

  # DisplayLinkドライバーのインストール・確認のためにVGAを一時的に有効化。
  # post-processorでnoneに変更する。
  vga {
    type   = "std"
    memory = 16
  }

  network_adapters {
    model    = "virtio"
    bridge   = "vmbr0"
    firewall = false
  }

  # テンプレートのgrow-rootfs-if-neededサービスが初回起動時に自動拡張する
  scsi_controller = "virtio-scsi-single"

  communicator         = "ssh"
  ssh_username         = "miutaku"
  ssh_private_key_file = var.ssh_private_key_file
  ssh_timeout          = "60m"

  qemu_agent = true

  template_name        = var.template_name
  template_description = "Ubuntu 26.04 MagicMirror² + DisplayLink template. Built by Packer on {{ isotime \"2006-01-02\" }}."
}

build {
  sources = ["source.proxmox-clone.mm-server"]

  # --- ファイル転送 ---

  provisioner "file" {
    source      = "${path.root}/files/20-displaylink.conf"
    destination = "/tmp/20-displaylink.conf"
  }

  provisioner "file" {
    source      = "${path.root}/files/10-monitor.conf"
    destination = "/tmp/10-monitor.conf"
  }

  provisioner "file" {
    source      = "${path.root}/files/00-mm-dconf"
    destination = "/tmp/00-mm-dconf"
  }

  provisioner "file" {
    source      = "${path.root}/files/00-mm-dconf.lock"
    destination = "/tmp/00-mm-dconf.lock"
  }

  provisioner "file" {
    source      = "${path.root}/files/gnome-kiosk-script"
    destination = "/tmp/gnome-kiosk-script"
  }

  provisioner "file" {
    source      = "${path.root}/files/magic-mirror.service"
    destination = "/tmp/magic-mirror.service"
  }

  # --- Step 1: ベースパッケージ + GUIインストール ---
  provisioner "shell" {
    environment_vars = ["DEBIAN_FRONTEND=noninteractive", "NEEDRESTART_MODE=l"]
    inline = [
      "while [ ! -f /var/lib/cloud/instance/boot-finished ]; do echo 'Waiting for cloud-init...'; sleep 5; done",
      "echo 'debconf debconf/frontend select Noninteractive' | sudo debconf-set-selections",
      "sudo apt-get update -qq",
      "sudo apt-get upgrade -y",
      "sudo apt-get install -y ubuntu-desktop-minimal git",
      "sudo apt-get purge -y libreoffice* thunderbird* || true",
      "sudo apt-get autoremove -y",
      "sudo apt-get autoclean",
    ]
  }

  # --- Step 2: DisplayLinkドライバーインストール (headless) ---
  # yes | でパイプしてインタラクティブな確認を全てYで自動応答する
  provisioner "shell" {
    environment_vars = ["DEBIAN_FRONTEND=noninteractive"]
    inline = [
      "git clone https://github.com/AdnanHodzic/displaylink-debian.git /tmp/displaylink-debian",
      "cd /tmp/displaylink-debian && yes | sudo ./displaylink-debian.sh",
      "rm -rf /tmp/displaylink-debian",
    ]
  }

  # --- Step 3: X11設定ファイル配置 ---
  provisioner "shell" {
    inline = [
      "sudo mkdir -p /etc/X11/xorg.conf.d",
      "sudo install -m 0644 /tmp/20-displaylink.conf /etc/X11/xorg.conf.d/20-displaylink.conf",
      "sudo mkdir -p /usr/share/X11/xorg.conf.d",
      "sudo install -m 0644 /tmp/10-monitor.conf /usr/share/X11/xorg.conf.d/10-monitor.conf",
    ]
  }

  # --- Step 4: 再起動 (DisplayLinkカーネルモジュールのロードに必要) ---
  provisioner "shell" {
    inline            = ["sudo reboot"]
    expect_disconnect = true
  }

  provisioner "shell" {
    pause_before = "60s"
    inline       = ["echo 'Resumed after reboot'"]
  }

  # --- Step 5: Dockerインストール ---
  provisioner "shell" {
    environment_vars = ["DEBIAN_FRONTEND=noninteractive"]
    inline = [
      "curl -fsSL https://get.docker.com -o /tmp/get-docker.sh",
      "sudo sh /tmp/get-docker.sh",
      "sudo gpasswd -a miutaku docker",
      "rm -f /tmp/get-docker.sh",
    ]
  }

  # --- Step 6: GDM自動ログイン設定 (headless: ファイル直接書き換え) ---
  # GUI: Settings → System → Users → Automatic Login の操作を代替
  provisioner "shell" {
    inline = [
      "sudo tee /etc/gdm3/custom.conf > /dev/null << 'EOF'",
      "[daemon]",
      "AutomaticLoginEnable=True",
      "AutomaticLogin=miutaku",
      "# DisplayLink (X11) を使うためWaylandを無効化",
      "WaylandEnable=false",
      "",
      "[security]",
      "",
      "[xdmcp]",
      "",
      "[chooser]",
      "",
      "[debug]",
      "EOF",
    ]
  }

  # --- Step 7: スリープ・スクリーンロック無効化 (headless: dconfシステム設定) ---
  # GUI: Settings → Power → Screen Blank → Never
  #      Settings → Privacy & Security → Screen Lock → 全無効
  # の操作を代替。/etc/dconf/db/ はGNOMEセッション不要で設定できる。
  provisioner "shell" {
    inline = [
      "sudo mkdir -p /etc/dconf/db/local.d/locks",
      "sudo install -m 0644 /tmp/00-mm-dconf /etc/dconf/db/local.d/00-mm-dconf",
      "sudo install -m 0644 /tmp/00-mm-dconf.lock /etc/dconf/db/local.d/locks/00-mm-dconf",
      "sudo dconf update",
    ]
  }

  # --- Step 8: Kioskモード設定 ---
  provisioner "shell" {
    environment_vars = ["DEBIAN_FRONTEND=noninteractive"]
    inline = [
      "sudo apt-get install -y gnome-kiosk gnome-kiosk-script-session",
      "mkdir -p /home/miutaku/.local/bin",
      "install -m 0755 /tmp/gnome-kiosk-script /home/miutaku/.local/bin/gnome-kiosk-script",
    ]
  }

  # --- Step 9: GDMデフォルトセッションをKioskに設定 (headless) ---
  # GUI: ログイン画面右下の歯車アイコン → Kiosk Script Session (X11) を選択
  # の操作を代替。AccountsServiceファイルを直接書き込む。
  provisioner "shell" {
    inline = [
      "sudo mkdir -p /var/lib/AccountsService/users",
      "sudo tee /var/lib/AccountsService/users/miutaku > /dev/null << 'EOF'",
      "[User]",
      "Language=ja_JP.UTF-8",
      "Session=gnome-kiosk-script-x11",
      "XSession=gnome-kiosk-script-x11",
      "SystemAccount=false",
      "EOF",
    ]
  }

  # --- Step 10: MagicMirror²セットアップ ---
  # config.js はAPIキーを含むためテンプレートには焼き込まない。
  # cloud-init (cicustom) で初回起動時に配置される。
  provisioner "shell" {
    inline = [
      "git clone https://github.com/miutaku/magic-mirror.git /home/miutaku/magic-mirror",
      "chown -R miutaku:miutaku /home/miutaku/magic-mirror",
      "sudo install -m 0644 /tmp/magic-mirror.service /etc/systemd/system/magic-mirror.service",
      "sudo systemctl enable magic-mirror.service",
    ]
  }

  # --- Step 11: cloud-initクリーンアップ ---
  provisioner "shell" {
    environment_vars = ["DEBIAN_FRONTEND=noninteractive"]
    inline = [
      "echo 'datasource_list: [NoCloud, ConfigDrive]' | sudo tee /etc/cloud/cloud.cfg.d/99-pve.cfg",
      "sudo cloud-init clean --logs",
      "sudo rm -rf /var/lib/cloud/",
      "sudo truncate -s 0 /etc/machine-id",
      "sudo rm -f /var/lib/dbus/machine-id",
      "sudo rm -f /etc/ssh/ssh_host_*",
      "sudo apt-get autoremove -y",
      "sudo apt-get clean",
    ]
  }

  # --- post-processor: VGAをnoneに変更 ---
  # テンプレートからクローンしたVMはDisplayLink経由で映像出力するため仮想GPUは不要。
  post-processor "shell-local" {
    environment_vars = [
      "PROXMOX_URL=${var.proxmox_url}",
      "PROXMOX_TOKEN_ID=${var.proxmox_token_id}",
      "PROXMOX_TOKEN_SECRET=${var.proxmox_token_secret}",
      "PROXMOX_NODE=${var.proxmox_node}",
      "VMID=${var.vmid}",
    ]
    inline = [
      "curl -k -s -o /dev/null -w 'Set VGA to none: HTTP %%{http_code}\\n' -X PUT -H \"Authorization: PVEAPIToken=$PROXMOX_TOKEN_ID=$PROXMOX_TOKEN_SECRET\" \"$PROXMOX_URL/nodes/$PROXMOX_NODE/qemu/$VMID/config\" -d 'vga=none'",
    ]
  }
}
