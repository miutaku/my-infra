# Loockit LXC host configuration

Loockit LXC 12902/12903は非特権・bridge networkで動かす。Bluetooth kernel moduleとBlueZは
各Proxmox hostが所有し、このunitが`org.bluez`だけを許可したD-Bus socketを作る。

両instanceはGreenの同じKubernetes Leaseへ参加する。leaderだけがBLEへ接続して`/readyz`を
200にし、standbyは503を返す。GreenのHAProxyがleaderだけへREST/gRPCを転送する。

```bash
sudo install -m 0644 loockit-dbus-proxy.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now loockit-dbus-proxy.service
```

CTには次のread-only bind mountが必要。

```text
mp0: /run/loockit-dbus,mp=/mnt/host-dbus,ro=1
```

Loockitの鍵はGitへ保存せず、BWS/ExternalSecretから`/etc/loockit/loockit.env`へmode 0600で
materializeする。OCIは同socketを`/run/dbus/system_bus_socket`へread-only mountする。

`image.env`がproduction imageの唯一のversion指定である。日次の
`loockit-version-watch.yml`がupstream releaseを検出してPRを作成し、merge後にLAN内runner上の
`loockit-lxc-deploy.yml`がこのplaybookを実行する。新containerが120秒以内にreadyにならなければ、
deploy scriptは直前containerへ自動rollbackする。

CIのSSH accountはshellを公開しない。`authorized_keys`のforced commandとsudoersを組み合わせ、
root所有の`deploy-loockit-local`だけを実行できる。script自身もimageを
`ghcr.io/miutaku/loockit:<semver>`へ制限する。accountを`docker` groupへ所属させてはならない。
