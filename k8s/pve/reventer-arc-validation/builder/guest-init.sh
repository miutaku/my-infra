#!/bin/sh
set -eu

/bin/busybox mount -t devtmpfs devtmpfs /dev
exec >/dev/console 2>&1
/bin/busybox --install -s /bin
export PATH=/bin HOME=/tmp
trap 'echo GUEST_BUILD_FAILED; poweroff -f' EXIT

mount -t proc proc /proc
mount -t sysfs sysfs /sys
mount -t cgroup2 none /sys/fs/cgroup
modprobe virtio_pci
modprobe virtio_blk
modprobe ext4
modprobe 9pnet_virtio
modprobe 9p
modprobe virtio_net
mount -t ext4 /dev/vda /data
mount -t 9p -o trans=virtio,version=9p2000.L,ro input /context
mount -t 9p -o trans=virtio,version=9p2000.L output /out
ip link set eth0 up
ip addr add 10.0.2.15/24 dev eth0

printf 'root:x:0:0:root:/tmp:/bin/sh\n' > /etc/passwd
printf 'root:x:0:\n' > /etc/group
printf 'hosts: files dns\n' > /etc/nsswitch.conf

mkdir /data/source
tar -xf /context/source.tar -C /data/source
source_sha=$(cat /context/source.sha)
printf '%s\n' "$source_sha" | grep -Eq '^[0-9a-f]{40}$'

proxy=http://10.0.2.100:3128
export HTTPS_PROXY=$proxy HTTP_PROXY=$proxy https_proxy=$proxy http_proxy=$proxy
component=$(cat /etc/reventer-build-component)
snapshotter=native
case "$component" in
    frontend|admin)
        modprobe overlay
        snapshotter=overlayfs
        ;;
esac
address=unix:///run/buildkit.sock
buildkitd --addr "$address" --root /data/cache --oci-worker-snapshotter "$snapshotter" \
    --containerd-worker=false >/data/buildkit.log 2>&1 &

for attempt in $(seq 1 15); do
    if buildctl --addr "$address" debug workers >/dev/null 2>&1; then break; fi
    sleep 1
done
set --
case "$component" in
    backend)
        test ! -e /context/environment
        if [ -d /context/binaries ]; then
            set -- --local builder=/context/binaries --opt context:builder=local:builder
        fi
        ;;
    frontend|admin)
        test ! -e /context/binaries
        environment=$(cat /context/environment)
        case "$environment" in
            stg) api=https://api-stg.re-venter.com ;;
            prd) api=https://api.re-venter.com ;;
            *) echo 'Invalid candidate environment' >&2; exit 1 ;;
        esac
        set -- --opt "build-arg:NEXT_PUBLIC_APP_ENV=$environment" --opt "build-arg:NEXT_PUBLIC_API_URL=$api"
        if [ "$component" = frontend ]; then
            portal=$(cat /context/stripe.portal)
            portal_id=${portal#https://billing.stripe.com/p/login/}
            if [ "$portal_id" = "$portal" ] || [ "${#portal}" -gt 256 ]; then exit 1; fi
            case "$portal_id" in ''|*[!A-Za-z0-9_]*) exit 1 ;; esac
            case "$environment:$portal" in
                stg:https://billing.stripe.com/p/login/test_?*) ;;
                prd:https://billing.stripe.com/p/login/test_*) exit 1 ;;
                prd:https://billing.stripe.com/p/login/?*) ;;
                *) exit 1 ;;
            esac
            set -- "$@" --opt "build-arg:NEXT_PUBLIC_STRIPE_PORTAL_LOGIN_URL=$portal" \
                --opt "build-arg:NEXT_PUBLIC_CALENDAR_BASE_URL=$api" \
                --opt "build-arg:SERVER_API_URL=http://backend.app-reventer-$environment.svc.cluster.local:8080"
        fi
        ;;
    *) echo 'Invalid candidate component' >&2; exit 1 ;;
esac
if ! buildctl --addr "$address" build --frontend dockerfile.v0 "$@" \
    --local context=/data/source --local dockerfile=/data/source \
    --opt platform=linux/amd64,linux/arm64 --opt "build-arg:SOURCE_SHA=$source_sha" \
    --opt "build-arg:HTTPS_PROXY=$proxy" --opt "build-arg:HTTP_PROXY=$proxy" \
    --opt "build-arg:https_proxy=$proxy" --opt "build-arg:http_proxy=$proxy" \
    --output type=oci,dest=/out/candidate.oci.tar,oci-mediatypes=true --progress plain; then
    tail -40 /data/buildkit.log
    exit 1
fi

test -s /out/candidate.oci.tar
echo GUEST_BUILD_VERIFIED
trap - EXIT
poweroff -f
