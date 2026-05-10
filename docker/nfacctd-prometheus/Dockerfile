FROM ubuntu:22.04 AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    build-essential git autoconf automake libtool pkg-config \
    libpcap-dev libmicrohttpd-dev \
    && rm -rf /var/lib/apt/lists/*

ARG PMACCT_VERSION=v1.7.9
RUN git clone --depth 1 --branch ${PMACCT_VERSION} \
    https://github.com/pmacct/pmacct.git /src/pmacct

WORKDIR /src/pmacct
RUN ./autogen.sh && \
    ./configure --with-microhttpd && \
    make -j"$(nproc)" && \
    strip src/nfacctd

FROM ubuntu:22.04
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpcap0.8 libmicrohttpd12 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /src/pmacct/src/nfacctd /usr/local/sbin/nfacctd

EXPOSE 2055/udp 9514/tcp
ENTRYPOINT ["nfacctd"]
