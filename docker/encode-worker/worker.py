"""encode-worker: EPGStation からの ffmpeg エンコードジョブを受け付ける FastAPI サーバー。

フロー:
  1. EPGStation の enc-remote.js が POST /v1/jobs でジョブを投入
  2. バックグラウンドで ffmpeg を実行 (asyncio.subprocess)
  3. enc-remote.js が GET /v1/jobs/{job_id} でポーリング → 進捗・完了を確認
  4. OCI 再起動後は initContainer (cleanup-orphans) が *.enc.tmp を削除し、
     EPGStation 側で "encode 失敗" として再試行キューに戻る。
"""

import asyncio
import os
import re
import shutil
import uuid
from enum import Enum
from typing import Dict, Optional

from fastapi import FastAPI, Header, HTTPException, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel

# ─── 設定 ────────────────────────────────────────────────────────────────────

TOKEN         = os.environ["ENCODE_WORKER_TOKEN"]
RECORDED_DIR  = os.environ.get("RECORDED_DIR", "/app/recorded")
MAX_JOBS      = int(os.environ.get("MAX_CONCURRENT_JOBS", "2"))

# ─── モデル ──────────────────────────────────────────────────────────────────

class JobStatus(str, Enum):
    waiting   = "waiting"
    running   = "running"
    completed = "completed"
    failed    = "failed"


class Job(BaseModel):
    job_id:       str
    input:        str
    output:       str
    codec:        str
    is_dual_mono: bool
    status:       JobStatus = JobStatus.waiting
    progress:     float     = 0.0
    log:          str       = ""
    duration:     float     = 0.0


class JobRequest(BaseModel):
    input:        str
    output:       str
    codec:        str        = "libx264"
    is_dual_mono: bool       = False


# ─── グローバル状態 ───────────────────────────────────────────────────────────

jobs:     Dict[str, Job] = {}
semaphore: Optional[asyncio.Semaphore] = None

app = FastAPI(title="encode-worker")


@app.on_event("startup")
async def startup():
    global semaphore
    semaphore = asyncio.Semaphore(MAX_JOBS)


# ─── 認証ヘルパー ─────────────────────────────────────────────────────────────

def verify_token(authorization: Optional[str]):
    if authorization != f"Bearer {TOKEN}":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")


# ─── API ──────────────────────────────────────────────────────────────────────

@app.get("/healthz")
def healthz():
    return {"status": "ok", "running": sum(1 for j in jobs.values() if j.status == JobStatus.running)}


@app.post("/v1/jobs", status_code=201)
async def create_job(
    req: JobRequest,
    authorization: Optional[str] = Header(default=None),
):
    verify_token(authorization)
    job = Job(
        job_id       = str(uuid.uuid4()),
        input        = req.input,
        output       = req.output,
        codec        = req.codec,
        is_dual_mono = req.is_dual_mono,
    )
    jobs[job.job_id] = job
    asyncio.create_task(run_job(job.job_id))
    return {"job_id": job.job_id}


@app.get("/v1/jobs/{job_id}")
def get_job(
    job_id: str,
    authorization: Optional[str] = Header(default=None),
):
    verify_token(authorization)
    job = jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@app.delete("/v1/jobs/{job_id}", status_code=204)
def cancel_job(
    job_id: str,
    authorization: Optional[str] = Header(default=None),
):
    verify_token(authorization)
    job = jobs.pop(job_id, None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")


# ─── エンコード実行 ───────────────────────────────────────────────────────────

async def get_duration(path: str) -> float:
    proc = await asyncio.create_subprocess_exec(
        "ffprobe", "-v", "0", "-show_format", "-of", "json", path,
        stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.DEVNULL,
    )
    stdout, _ = await proc.communicate()
    import json
    try:
        return float(json.loads(stdout)["format"]["duration"])
    except Exception:
        return 0.0


def build_ffmpeg_args(job: Job, tmp_output: str) -> list[str]:
    args = ["-y", "-fix_sub_duration", "-i", job.input]

    args += ["-map", "0:v", "-c:v", job.codec]
    args += ["-vf", "yadif"]

    if job.is_dual_mono:
        args += [
            "-filter_complex", "channelsplit[FL][FR]",
            "-map", "[FL]", "-map", "[FR]",
            "-metadata:s:a:0", "language=jpn",
            "-metadata:s:a:1", "language=eng",
            "-ac", "1",
        ]
    else:
        args += ["-map", "0:a"]

    args += ["-c:a", "aac"]
    args += ["-map", "0:s?", "-c:s", "mov_text"]
    args += ["-preset", "veryfast", "-crf", "26"]
    args += [tmp_output]
    return args


# frame= 1234 fps= 25 ... time=00:01:23.45 ...
_FRAME_RE = re.compile(r"time=(\d+):(\d+):(\d+(?:\.\d+)?)")


async def run_job(job_id: str):
    job = jobs[job_id]
    async with semaphore:
        job.status   = JobStatus.running
        job.duration = await get_duration(job.input)

        tmp_output = job.output + ".enc.tmp"
        args = build_ffmpeg_args(job, tmp_output)

        proc = await asyncio.create_subprocess_exec(
            "ffmpeg", *args,
            stdout=asyncio.subprocess.DEVNULL,
            stderr=asyncio.subprocess.PIPE,
        )

        async for line in proc.stderr:
            text = line.decode(errors="replace")
            m = _FRAME_RE.search(text)
            if m and job.duration > 0:
                current = (
                    int(m.group(1)) * 3600
                    + int(m.group(2)) * 60
                    + float(m.group(3))
                )
                job.progress = min(current / job.duration, 1.0)
                job.log      = text.strip()

        await proc.wait()

        if proc.returncode == 0 and os.path.exists(tmp_output):
            shutil.move(tmp_output, job.output)
            job.status   = JobStatus.completed
            job.progress = 1.0
        else:
            if os.path.exists(tmp_output):
                os.remove(tmp_output)
            job.status = JobStatus.failed
            job.log    = f"ffmpeg exited with code {proc.returncode}"
