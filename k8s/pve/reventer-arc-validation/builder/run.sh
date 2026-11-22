#!/bin/sh
set -eu
set -o pipefail
umask 007

tools=/etc/reventer-qemu-build
bridge=/bridge
scratch=/scratch
case "${REVENTER_BUILD_SCALE_SET:-arc-reventer-backend-candidate}" in
    arc-reventer-backend-candidate) component=backend ;;
    arc-reventer-frontend-candidate) component=frontend ;;
    arc-reventer-admin-candidate) component=admin ;;
    arc-reventer-infrastructure-admission) component=admission ;;
    arc-reventer-infrastructure-docker) component=integration ;;
    *) echo 'Unsupported build runner' >&2; exit 1 ;;
esac
export REVENTER_BUILD_COMPONENT=$component

hold_for_runner() {
    status=$?
    trap - EXIT
    if [ -n "${proxy_pid:-}" ]; then
        kill "$proxy_pid" 2>/dev/null || true
    fi
    if [ "$status" -ne 0 ]; then
        case "$component" in
            admission|integration)
                if [ -f "$scratch/guest.log" ]; then
                    tail -80 "$scratch/guest.log" > "$bridge/output/guest-boot.log"
                fi
                ;;
        esac
        touch "$bridge/failed"
    fi
    exec sleep infinity
}
trap hold_for_runner EXIT

mkdir -p "$bridge/input" "$bridge/output"
touch "$bridge/ready"
cd "$scratch"
mkdir -p apks host cache guest/bin guest/lib guest/rootfs guest/etc/ssl/certs
apk --cache-dir "$scratch/cache" fetch --recursive --output "$scratch/apks" \
    qemu-system-x86_64 seabios linux-virt busybox-static cpio e2fsprogs python3
for package in apks/*.apk; do
    tar --no-same-owner -xzf "$package" -C host
done
export PATH="$scratch/host/usr/bin:$PATH"
export LD_LIBRARY_PATH="$scratch/host/lib:$scratch/host/usr/lib"
export PYTHONHOME="$scratch/host/usr"

if [ "$component" = admission ] || [ "$component" = integration ]; then
    mkdir guest-apks
    set -- alpine-base docker kmod python3 py3-yaml
    if [ "$component" = integration ]; then
        set -- "$@" bash openssl docker-cli-buildx docker-cli-compose
    fi
    apk --cache-dir "$scratch/cache" fetch --recursive --output "$scratch/guest-apks" "$@"
    for package in guest-apks/*.apk; do
        tar --no-same-owner -xzf "$package" -C guest
    done
    rm -f guest/bin/bbsuid
    cp "$tools/guest-infrastructure.sh" guest/guest-init
else
    buildkit=buildkit-v0.35.1.linux-amd64.tar.gz
    wget -q -O "$buildkit" "https://github.com/moby/buildkit/releases/download/v0.35.1/$buildkit"
    printf '%s  %s\n' b248c2b91698aafef11818fe8b681dc5e341581f7d5676709ff45ca1f29b0408 "$buildkit" | sha256sum -c
    tar --no-same-owner -xzf "$buildkit" -C guest \
        bin/buildkitd bin/buildctl bin/buildkit-runc bin/buildkit-qemu-aarch64
    cp "$tools/guest-init.sh" guest/guest-init
fi
cp host/boot/vmlinuz-virt kernel
cp -a host/lib/modules guest/lib/
cp host/bin/busybox.static guest/bin/busybox
ln -sf busybox guest/bin/sh
cp /etc/ssl/certs/ca-certificates.crt guest/etc/ssl/certs/
printf '%s\n' "$component" > guest/etc/reventer-build-component

cat > guest/init <<'INIT'
#!/bin/sh
set -eu
/bin/busybox mount -t tmpfs -o size=650m tmpfs /rootfs
/bin/busybox cp -a /bin /lib /etc /guest-init /rootfs/
for directory in /sbin /usr /var; do
    if [ -d "$directory" ]; then /bin/busybox cp -a "$directory" /rootfs/; fi
done
/bin/busybox mkdir -p /rootfs/proc /rootfs/sys /rootfs/dev /rootfs/tmp /rootfs/data /rootfs/run /rootfs/context /rootfs/out
exec /bin/busybox switch_root /rootfs /guest-init
INIT
chmod 755 guest/init guest/guest-init
(
    cd guest
    find . | cpio -o -H newc | gzip -1
) > initramfs.gz

while [ ! -f "$bridge/start" ]; do sleep 2; done
test -s "$bridge/input/source.tar"
test -s "$bridge/input/source.sha"
truncate -s 16G build-disk.img
mkfs=$(find host -name mkfs.ext4 -print -quit)
test -n "$mkfs"
"$mkfs" -q -F build-disk.img

python3 "$tools/connect-proxy.py" >proxy.log 2>&1 &
proxy_pid=$!
for attempt in $(seq 1 10); do
    if grep -q BUILD_PROXY_READY proxy.log; then break; fi
    sleep 1
done
grep -q BUILD_PROXY_READY proxy.log

if ! qemu-system-x86_64 -machine q35,accel=tcg -cpu max -smp 2 -m 3600 \
    -kernel kernel -initrd initramfs.gz -append 'console=ttyS0 rdinit=/init panic=1 quiet' \
    -nographic -monitor none -no-reboot \
    -netdev 'user,id=n0,restrict=on,ipv6=off,guestfwd=tcp:10.0.2.100:3128-cmd:/bin/busybox nc 127.0.0.1 3128' \
    -device virtio-net-pci,netdev=n0 -drive if=virtio,format=raw,file=build-disk.img \
    -virtfs "local,path=$bridge/input,mount_tag=input,security_model=none,readonly=on" \
    -virtfs "local,path=$bridge/output,mount_tag=output,security_model=none" \
    -L "$scratch/host/usr/share/qemu" > guest.log 2>&1; then
    tail -80 guest.log
    exit 1
fi
tail -80 guest.log
case "$component" in
    admission|integration) grep -q '^GUEST_INFRASTRUCTURE_VERIFIED' guest.log ;;
    *)
        grep -q '^GUEST_BUILD_VERIFIED' guest.log
        (cd "$bridge/output" && sha256sum candidate.oci.tar > candidate.sha256)
        ;;
esac
touch "$bridge/complete"
