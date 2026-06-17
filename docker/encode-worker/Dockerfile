FROM python:3.14-slim-bookworm

ENV DEBIAN_FRONTEND=noninteractive

# jellyfin-ffmpeg (libaribb24 込み ARM64 ビルド) + ロケール
RUN apt-get update && apt-get install -y --no-install-recommends curl gnupg locales \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://repo.jellyfin.org/jellyfin_team.gpg.key \
       | gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg \
    && echo "deb [arch=arm64 signed-by=/etc/apt/keyrings/jellyfin.gpg] https://repo.jellyfin.org/debian bookworm main" \
       > /etc/apt/sources.list.d/jellyfin.list \
    && apt-get update && apt-get install -y --no-install-recommends jellyfin-ffmpeg7 \
    && ln -sf /usr/lib/jellyfin-ffmpeg/ffmpeg  /usr/local/bin/ffmpeg \
    && ln -sf /usr/lib/jellyfin-ffmpeg/ffprobe /usr/local/bin/ffprobe \
    && locale-gen ja_JP.UTF-8 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV LANG=ja_JP.UTF-8
ENV LC_ALL=ja_JP.UTF-8

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY worker.py .

ENV ENCODE_WORKER_TOKEN=""
ENV RECORDED_DIR="/app/recorded"
ENV MAX_CONCURRENT_JOBS="2"

EXPOSE 8080

CMD ["uvicorn", "worker:app", "--host", "0.0.0.0", "--port", "8080", "--timeout-graceful-shutdown", "7200"]
