# To use this Dockerfile, you have to set `output: 'standalone'` in your next.config.mjs file.
# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM oven/bun:1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY bun.lock ./
COPY package.json ./
# Usar cache mount para bun install
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile --production=false

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Optimización 4: Copiar node_modules y archivos de configuración primero
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY bun.lock* ./

# Optimización 5: Usar .dockerignore para evitar copiar archivos innecesarios
# Copiar archivos de configuración críticos primero
COPY next.config.* ./
COPY tailwind.config.* ./
COPY postcss.config.* ./
COPY tsconfig.json ./
# COPY payload.config.* ./

# Copiar el resto del código fuente
COPY src ./src
COPY public ./public

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# Optimización 7: Usar cache mount para next build
RUN --mount=type=cache,target=/app/.next/cache \
    bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# Optimización 8: Crear usuario en una sola capa
# RUN addgroup --system --gid 1001 nodejs && \
#     adduser --system --uid 1001 nextjs
# Optimización 9: Crear directorio .next con permisos correctos
# RUN mkdir .next && chown nextjs:nodejs .next
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && mkdir .next && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Remove this line if you do not have this folder
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000
ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" bun server.js