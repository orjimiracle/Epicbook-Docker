FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app /app

RUN npm prune --production

EXPOSE 8080

CMD ["node", "server.js"]
