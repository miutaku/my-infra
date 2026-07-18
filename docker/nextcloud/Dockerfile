# 動画サムネイル (OC\Preview\Movie) 生成用に ffmpeg を同梱した NextCloud。
# バージョンアップはこの FROM タグを1メジャーずつ上げる (docs/nextcloud-setup.md 参照)。
FROM nextcloud:34-apache

RUN apt-get update \
  && apt-get install -y --no-install-recommends ffmpeg \
  && rm -rf /var/lib/apt/lists/*
