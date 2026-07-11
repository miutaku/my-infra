FROM python:3.13-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY exporter.py .

USER 65532:65532
EXPOSE 9123
CMD ["python", "/app/exporter.py"]
