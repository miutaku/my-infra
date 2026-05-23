FROM python:3.12-slim-bookworm

ENV DEBIAN_FRONTEND=noninteractive

# ffmpeg (ARM64 Debian パッケージ) + libaribb24 (日本語字幕)
RUN apt-get update && apt-get install -y --no-install-recommends \
        ffmpeg \
        libaribb24-0 \
        locales \
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

CMD ["uvicorn", "worker:app", "--host", "0.0.0.0", "--port", "8080"]
