FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

FROM node:20-alpine AS final

USER node

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --chown=node:node . .

EXPOSE 3000

CMD ["node", "index.js"]
