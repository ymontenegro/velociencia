# Stage 1: Dependencies
FROM node:22-slim AS deps
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:22-slim AS builder
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p data content/nutricion content/ciencia content/entrenamiento content/competencia
ENV OPENAI_API_KEY=build-placeholder
RUN npm run build

# Stage 3: Runner
FROM node:22-slim AS runner
RUN apt-get update && apt-get install -y --no-install-recommends libstdc++6 && rm -rf /var/lib/apt/lists/*
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Schema initializer (idempotent) + entrypoint — keeps the persistent DB volume
# in sync with the app's schema on every boot, even on a fresh volume.
COPY --from=builder /app/scripts/init-db.cjs ./scripts/init-db.cjs
COPY --from=builder /app/scripts/init-db.sql ./scripts/init-db.sql
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

RUN mkdir -p data content/nutricion content/ciencia content/entrenamiento content/competencia

VOLUME ["/app/data", "/app/content"]

EXPOSE 3000

CMD ["./docker-entrypoint.sh"]
