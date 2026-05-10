FROM ubuntu:24.04 AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential git autoconf automake libtool pkg-config \
    libpcap-dev libmicrohttpd-dev \
    && rm -rf /var/lib/apt/lists/*

ARG PMACCT_VERSION=v1.7.9
RUN git clone --depth 1 --branch ${PMACCT_VERSION} \
    https://github.com/pmacct/pmacct.git /src/pmacct

WORKDIR /src/pmacct
RUN ./autogen.sh && \
    ./configure --enable-prometheus && \
    make -j"$(nproc)" nfacctd && \
    strip src/nfacctd

FROM ubuntu:24.04
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpcap0.8t64 libmicrohttpd12t64 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /src/pmacct/src/nfacctd /usr/local/sbin/nfacctd

EXPOSE 2055/udp 9514/tcp
ENTRYPOINT ["nfacctd"]
