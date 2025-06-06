FROM node:22.8.0-slim

RUN apt-get update && \
    apt-get install -y openssl procps bc netcat-openbsd && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]