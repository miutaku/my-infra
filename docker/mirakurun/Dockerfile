FROM chinachu/mirakurun:amd64-4.1.1

# ビルド時に recpt1 / decrypt ライブラリをインストールしておくことで
# コンテナ起動時の長時間ビルドを回避する。
# startup スクリプトは "if ! type recpt1" チェックをスキップして recpt1 -v のみ実行する。
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
        autoconf \
        automake \
        cmake \
        libpcsclite1 \
        libtool \
    && rm -rf /var/lib/apt/lists/*

# libyakisoba: B-CAS キー処理ライブラリ
RUN cd /tmp \
    && git clone --depth 1 https://github.com/tsunoda14/libyakisoba.git \
    && cd libyakisoba \
    && autoreconf -i \
    && mkdir build && cd build \
    && ../configure \
    && make && make install \
    && ldconfig

# libsobacas: B-CAS ソフトウェアエミュレーションライブラリ
RUN cd /tmp \
    && git clone --depth 1 https://github.com/tsunoda14/libsobacas.git \
    && cd libsobacas \
    && autoreconf -i \
    && mkdir build && cd build \
    && ../configure \
    && make && make install \
    && ldconfig

# libaribb25: ARIB B25 デコーダー (libsobacas バックエンド使用)
RUN cd /tmp \
    && git clone --depth 1 https://github.com/tsukumijima/libaribb25.git \
    && cd libaribb25 \
    && cmake . -B build -DWITH_PCSC_PACKAGE=NO -DWITH_PCSC_LIBRARY=sobacas \
    && cd build \
    && make && make install \
    && ldconfig

# recpt1: PT1/PT2/PT3 用録画ツール (DVB API 経由)
RUN cd /tmp \
    && git clone https://github.com/stz2012/recpt1.git \
    && cd recpt1/recpt1 \
    && ./autogen.sh \
    && ./configure --enable-b25 \
    && make && make install

# startup スクリプトをイメージに組み込む
# bcas_keys は Secret としてコンテナに /opt/bin/bcas_keys でマウントされる
COPY startup /opt/bin/startup
RUN chmod +x /opt/bin/startup

RUN apt-get purge -y git autoconf automake cmake libtool \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /tmp/*
