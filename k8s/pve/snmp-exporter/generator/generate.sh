#!/usr/bin/env bash
# snmp.yml を generator から再生成する。
# 必要な MIB はすべて自動ダウンロードするため、事前配置不要。
# 実行後、出力の ix2215 モジュール部分を values.yaml の snmpConfig.modules.ix2215 に反映すること。
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT="${SCRIPT_DIR}/snmp.yml"

NET_SNMP_URL="https://raw.githubusercontent.com/net-snmp/net-snmp/v5.9/mibs"
CISCO_URL="https://raw.githubusercontent.com/cisco/cisco-mibs/f55dc443daff58dfc86a764047ded2248bb94e12/v2"
IANA_IFTYPE_URL="https://www.iana.org/assignments/ianaiftype-mib/ianaiftype-mib"
NEC_URL="https://jpn.nec.com/univerge/ix/Manual/MIB"
NEC_UA="Mozilla/5.0 (compatible; snmp-generator)"

# 作業用一時ディレクトリ
OPTDIR="$(mktemp -d)"
trap "rm -rf ${OPTDIR}" EXIT
mkdir -p "${OPTDIR}/mibs"

MIBDIR="${OPTDIR}/mibs"

echo "==> 標準 MIB をダウンロードしています..."

# net-snmp 標準 MIB (IF-MIB / IP-MIB / SNMPv2 系の依存)
for name in \
    HCNUM-TC \
    IF-MIB \
    IP-MIB \
    INET-ADDRESS-MIB \
    IPV6-TC \
    SNMPv2-CONF \
    SNMPv2-MIB \
    SNMPv2-SMI \
    SNMPv2-TC \
    SNMP-FRAMEWORK-MIB \
    TCP-MIB \
    UDP-MIB
do
    curl -sfL "${NET_SNMP_URL}/${name}.txt" -o "${MIBDIR}/${name}"
done

# IANA-IFTYPE-MIB (IF-MIB の依存)
curl -sfL "${IANA_IFTYPE_URL}" -o "${MIBDIR}/IANA-IFTYPE-MIB"

# ISDN-MIB (PICO-SMI-MIB の依存)
curl -sfL "${CISCO_URL}/ISDN-MIB.my" -o "${MIBDIR}/ISDN-MIB"

echo "==> NEC enterprise MIB をダウンロードしています..."
curl -sfL -A "${NEC_UA}" "${NEC_URL}/PICO-SMI-MIB.txt"    -o "${MIBDIR}/PICO-SMI-MIB"
curl -sfL -A "${NEC_UA}" "${NEC_URL}/PICO-SMI-ID-MIB.txt" -o "${MIBDIR}/PICO-SMI-ID-MIB"

# generator.yml をコピー
cp "${SCRIPT_DIR}/generator.yml" "${OPTDIR}/"

echo "==> snmp-generator を実行しています..."
docker run --rm \
  -v "${OPTDIR}:/opt/" \
  prom/snmp-generator:latest \
  generate

cp "${OPTDIR}/snmp.yml" "${OUTPUT}"

echo ""
echo "==> 完了: ${OUTPUT}"
echo ""
echo "次のステップ:"
echo "  1. ${OUTPUT} の ix2215 モジュール内容を確認する"
echo "  2. values.yaml の snmpConfig.modules.ix2215 に反映する"
echo "  3. git commit & ArgoCD sync"
