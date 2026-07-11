FROM python:3.14-slim-trixie

ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1
ENV TZ=Asia/Tokyo

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY sync.py .

# 既定値 (実際の値は k8s CronJob の env / Secret / ConfigMap で上書きする)
ENV ANNICT_TOKEN=""
ENV SCRAPER_BASE_URL="http://annict-scraper.app-annict-scraper.svc.cluster.local:8080"
ENV EPGSTATION_BASE_URL="http://epgstation.app-epgstation.svc.cluster.local:8888"
ENV SUBSCRIBED_SERVICES="dアニメストア,Amazon プライム・ビデオ,Netflix"
ENV CHANNEL_MAP_FILE="/config/channel-map.json"
ENV MATCH_TOLERANCE_SEC="300"
ENV DRY_RUN="true"

CMD ["python", "sync.py"]
