#!/bin/sh
set -eu

/bin/busybox mount -t devtmpfs devtmpfs /dev
exec >/dev/console 2>&1
export PATH=/context/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin HOME=/tmp
/bin/busybox --install -s /bin
trap 'echo GUEST_ADMISSION_FAILED; poweroff -f' EXIT

mount -t proc proc /proc
mount -t sysfs sysfs /sys
mount -t cgroup2 none /sys/fs/cgroup
for module in virtio_pci virtio_blk ext4 9pnet_virtio 9p virtio_net overlay br_netfilter nf_tables; do
    modprobe "$module"
done
mount -t ext4 /dev/vda /data
mount -t 9p -o trans=virtio,version=9p2000.L,ro input /context
mount -t 9p -o trans=virtio,version=9p2000.L output /out
ip link set lo up
ip link set eth0 up
ip addr add 10.0.2.15/24 dev eth0

export HTTP_PROXY=http://10.0.2.100:3128 HTTPS_PROXY=http://10.0.2.100:3128 NO_PROXY=127.0.0.1,localhost
dockerd --feature containerd-snapshotter=true --data-root /data/docker >/data/dockerd.log 2>&1 &
for attempt in $(seq 1 60); do
    if docker info >/dev/null 2>&1; then break; fi
    sleep 1
done
if ! docker info --format 'cgroup={{.CgroupVersion}} driver={{.Driver}}'; then
    tail -50 /data/dockerd.log
    exit 1
fi

mkdir /data/source
tar -xf /context/source.tar -C /data/source
cd /data/source
node_image=$(PYTHONPATH=tests/admission python3 -c 'from dependencies import NODE_IMAGE; print(NODE_IMAGE)')
docker pull "$node_image"
unset HTTP_PROXY HTTPS_PROXY NO_PROXY
if ! python3 tests/admission/run.py --kind-binary /context/kind \
    --crd-file /context/externalsecrets.yaml --certificate-crd-file /context/cert-manager.crds.yaml \
    >/out/admission.log 2>&1; then
    cat /out/admission.log
    exit 1
fi
cat /out/admission.log
echo GUEST_ADMISSION_VERIFIED
trap - EXIT
poweroff -f
