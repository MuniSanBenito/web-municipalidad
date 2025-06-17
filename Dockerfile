FROM oven/bun:1-alpine AS base


WORKDIR /app

# Dependencies layer - solo dependencias de producción
FROM base AS deps
COPY package.json bun.lockb* ./
RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache bun install --production --frozen-lockfile

# Build dependencies - todas las dependencias
FROM base AS build-deps
COPY package.json bun.lockb* ./
RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache bun install --frozen-lockfile

# Builder stage
FROM base AS builder
COPY --from=build-deps /app/node_modules ./node_modules
COPY . .

# Variables de entorno para build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build de la aplicación
RUN bun run build

# Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos públicos
COPY --from=builder /app/public ./public

# Aprovechar Next.js standalone output para reducir tamaño
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiar dependencias de producción
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["bun", "server.js"]