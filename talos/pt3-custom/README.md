# Talos PT3 custom-kernel PoC

This PoC changes one upstream Talos kernel option: `CONFIG_DVB_PT3=m`. Talos
already builds `MEDIA_SUPPORT`, `MEDIA_DIGITAL_TV_SUPPORT`, and `DVB_CORE` on
amd64. No third-party PT3 source or DKMS package is used.

The GitHub Actions workflow builds the kernel and installer from immutable
Talos and `siderolabs/pkgs` revisions, then publishes the installer to GHCR.
Building is automatic; deployment is intentionally not automatic.

## Safety boundary

- The workflow never connects to Proxmox, Blue RKE2, or Green Talos.
- It never changes a Talos machine configuration.
- An installer is identified by OCI digest before it may be tested.
- PT3 hardware testing uses `talos/green/scripts/test-pt3-passthrough` and its
  EXIT rollback, after verifying that no recording is active.
- Production adoption requires a separate decision after four DVB adapters and
  an actual receive test pass.

## Update flow

`talos/pt3-custom/versions.env` pins both source revisions. A version-watch
workflow may propose patch releases, but a PR must pass the custom-kernel build.
Minor and major updates are rejected by policy. Merging an update does not
deploy it.

