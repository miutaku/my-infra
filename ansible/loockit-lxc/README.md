# Loockit LXC host configuration

Loockit LXC 12902は非特権・bridge networkで動かす。Bluetooth kernel moduleとBlueZは
`pve-x570`が所有し、このunitが`org.bluez`だけを許可したD-Bus socketを作る。

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
