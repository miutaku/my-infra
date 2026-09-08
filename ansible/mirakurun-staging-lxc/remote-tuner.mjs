import http from "node:http";

const [type, channel] = process.argv.slice(2);
if (!type || !channel) {
  console.error("usage: remote-tuner.mjs <type> <channel>");
  process.exit(64);
}

const request = http.get({
  host: "192.168.20.132",
  port: 40772,
  path: `/api/channels/${encodeURIComponent(type)}/${encodeURIComponent(channel)}/stream?decode=1`,
  headers: {
    "X-Mirakurun-Priority": "0",
    "User-Agent": "mirakurun-staging-remote-tuner/1.0",
  },
}, (response) => {
  if (response.statusCode !== 200) {
    console.error(`production Mirakurun returned HTTP ${response.statusCode}`);
    response.resume();
    process.exitCode = 69;
    return;
  }
  response.pipe(process.stdout);
});

request.on("error", (error) => {
  console.error(error.message);
  process.exit(69);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => request.destroy());
}
