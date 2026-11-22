import ipaddress
import os
import re
import select
import socket
import socketserver

ALLOWED_HOSTS = {
    "auth.docker.io",
    "dl-cdn.alpinelinux.org",
    "docker-images-prod.6aa30f8b08e16409b46e0173d6de2f56.r2.cloudflarestorage.com",
    "production.cloudflare.docker.com",
    "production.cloudfront.docker.com",
    "proxy.golang.org",
    "sum.golang.org",
    "storage.googleapis.com",
    "registry-1.docker.io",
}

if os.environ.get("REVENTER_BUILD_COMPONENT") in ("frontend", "admin"):
    ALLOWED_HOSTS.add("registry.npmjs.org")
if os.environ.get("REVENTER_BUILD_COMPONENT") == "admin":
    ALLOWED_HOSTS.update(("fonts.googleapis.com", "fonts.gstatic.com"))
if os.environ.get("REVENTER_BUILD_COMPONENT") == "integration":
    ALLOWED_HOSTS.update(("quay.io", "cdn01.quay.io", "gcr.io", "pypi.org", "files.pythonhosted.org"))


def connect_public(host):
    for family, kind, protocol, _, address in socket.getaddrinfo(host, 443, socket.AF_INET, socket.SOCK_STREAM):
        if not ipaddress.ip_address(address[0]).is_global:
            continue
        upstream = socket.socket(family, kind, protocol)
        try:
            upstream.settimeout(15)
            upstream.connect(address)
            return upstream
        except OSError:
            upstream.close()
    raise OSError("Could not connect to public endpoint")

class Proxy(socketserver.StreamRequestHandler):
    rbufsize = 0

    def handle(self):
        self.connection.settimeout(20)
        request = self.rfile.readline(4097)
        connect = re.fullmatch(rb"CONNECT ([A-Za-z0-9.-]+):443 HTTP/1\.[01]\r\n", request)
        host = connect[1].decode("ascii").lower() if connect else ""
        if host not in ALLOWED_HOSTS:
            print("CONNECT denied", host if host else "(invalid request)", flush=True)
            self.wfile.write(b"HTTP/1.1 403 Forbidden\r\nContent-Length: 0\r\n\r\n")
            return
        remaining = 8192
        while remaining > 0:
            line = self.rfile.readline(remaining + 1)
            remaining -= len(line)
            if line == b"\r\n":
                break
            if not line:
                return
        if remaining <= 0:
            return
        with connect_public(host) as upstream:
            self.wfile.write(b"HTTP/1.1 200 Connection Established\r\n\r\n")
            print("CONNECT allowed", host, flush=True)
            peers = {upstream: self.connection, self.connection: upstream}
            while True:
                readable, _, _ = select.select(peers, [], [], 90)
                if not readable:
                    return
                for client in readable:
                    data = client.recv(65536)
                    if not data:
                        return
                    peers[client].sendall(data)

class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

with Server(("127.0.0.1", 3128), Proxy) as server:
    print("BUILD_PROXY_READY", flush=True)
    server.serve_forever()
