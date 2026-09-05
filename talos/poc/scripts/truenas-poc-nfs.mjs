#!/usr/bin/env node

const action = process.argv[2] ?? "status";
const allowedActions = new Set(["status", "create", "delete"]);
if (!allowedActions.has(action)) {
  console.error("usage: truenas-poc-nfs.mjs [status|create|delete]");
  process.exit(2);
}

const password = process.env.TRUENAS_PASSWORD;
if (!password) {
  console.error("TRUENAS_PASSWORD is required");
  process.exit(2);
}

const apiUrl = process.env.TRUENAS_API_URL ?? "wss://192.168.20.192/websocket";
const username = process.env.TRUENAS_USERNAME ?? "admin";
const dataset = "raid1_case/talos-poc";
const exportPath = `/mnt/${dataset}`;
const confirmation = "raid1_case/talos-poc@192.168.20.192";

if (action !== "status" && process.env.TALOS_POC_NFS_CONFIRM !== confirmation) {
  console.error(`refusing ${action}: set TALOS_POC_NFS_CONFIRM=${confirmation}`);
  process.exit(2);
}

let nextId = 1;
const pending = new Map();
const socket = new WebSocket(apiUrl);

let finishConnect;
const connected = new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error("TrueNAS WebSocket connection timed out")), 10000);
  finishConnect = () => {
    clearTimeout(timer);
    resolve();
  };
  socket.addEventListener("open", () => {
    socket.send(JSON.stringify({ msg: "connect", version: "1", support: ["1"] }));
  }, { once: true });
  socket.addEventListener("error", () => {
    clearTimeout(timer);
    reject(new Error("TrueNAS WebSocket connection failed"));
  }, { once: true });
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(String(event.data));
  if (message.msg === "connected") {
    finishConnect();
    return;
  }
  if (message.id === undefined || !pending.has(message.id)) return;
  const { method, resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) {
    const reason = message.reason ?? message.error.message ?? message.error;
    const detail = typeof reason === "string" ? reason : (reason.reason ?? reason.errname ?? "unknown error");
    reject(new Error(`${method} failed: ${detail}`));
  } else {
    resolve(message.result);
  }
});

function rpc(method, params = []) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { method, resolve, reject });
    socket.send(JSON.stringify({ id, msg: "method", method, params }));
  });
}

async function currentState() {
  const datasets = await rpc("pool.dataset.query", [[["id", "=", dataset]]]);
  const shares = await rpc("sharing.nfs.query", [[["path", "=", exportPath]]]);
  return { datasets, shares };
}

try {
  await connected;
  const login = await rpc("auth.login", [username, password]);
  process.env.TRUENAS_PASSWORD = "";
  if (login !== true) {
    throw new Error("TrueNAS authentication failed");
  }

  const version = await rpc("system.version");
  let state = await currentState();

  if (action === "status") {
    console.log(`TrueNAS ${version}; dataset=${state.datasets.length}; share=${state.shares.length}`);
  } else if (action === "create") {
    if (state.datasets.length || state.shares.length) {
      throw new Error("refusing create: PoC dataset or share already exists");
    }
    await rpc("pool.dataset.create", [{
      name: dataset,
      type: "FILESYSTEM",
      share_type: "GENERIC",
      comments: "Disposable Talos migration POC-06; delete after test",
      quota: 1073741824,
      user_properties: [
        { key: "org:created_by", value: "my-infra/talos-poc" },
        { key: "org:expires", value: "2026-08-30" },
      ],
    }]);
    try {
      await rpc("sharing.nfs.create", [{
        path: exportPath,
        comment: "talos-poc POC-06 disposable",
        networks: ["192.168.20.137/32", "192.168.20.138/32"],
        maproot_user: "root",
        maproot_group: "root",
        enabled: true,
      }]);
    } catch (error) {
      await rpc("pool.dataset.delete", [dataset, { recursive: false, force: false }]);
      throw error;
    }
    state = await currentState();
    if (state.datasets.length !== 1 || state.shares.length !== 1) {
      throw new Error("create verification failed");
    }
    console.log(`created disposable dataset ${dataset} and Green-only NFS share`);
  } else {
    if (state.datasets.length !== 1 || state.shares.length !== 1) {
      throw new Error("refusing delete: expected exactly one PoC dataset and one PoC share");
    }
    const share = state.shares[0];
    if (share.path !== exportPath || share.comment !== "talos-poc POC-06 disposable") {
      throw new Error("refusing delete: NFS share identity does not match PoC baseline");
    }
    await rpc("sharing.nfs.delete", [share.id]);
    await rpc("pool.dataset.delete", [dataset, { recursive: false, force: false }]);
    state = await currentState();
    if (state.datasets.length || state.shares.length) {
      throw new Error("delete verification failed");
    }
    console.log(`deleted disposable NFS share and dataset ${dataset}`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  socket.close();
}
