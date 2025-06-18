# Dockerfile optimizado para PayloadCMS con Next.js usando Bun
# Requiere `output: 'standalone'` en next.config.js
FROM oven/bun:alpine AS base

# Instalar dependencias del sistema de una sola vez
RUN apk add --no-cache libc6-compat

# Habilitar corepack globalmente
# RUN corepack enable

WORKDIR /app

# Instalar dependencias solamente cuando sea necesario
FROM base AS deps

# Copiar archivos de dependencias primero (mejor cache layering)
COPY package.json bun.lockb* ./

# Instalar solo dependencias de producción con Bun
RUN bun install --frozen-lockfile --production --no-audit --no-fund --prefer-offline

# Instalar dependencias de desarrollo para el build
FROM base AS dev-deps
COPY package.json bun.lockb* ./

# Instalar todas las dependencias (incluyendo dev) para el build
RUN bun install --no-audit --no-fund --prefer-offline

# Stage de build optimizado
FROM base AS builder
WORKDIR /app

# Copiar dependencias de desarrollo
COPY --from=dev-deps /app/node_modules ./node_modules

# Copiar archivos de configuración primero
COPY next.config.* ./
COPY tsconfig.json* ./
COPY tailwind.config.* ./
COPY postcss.config.* ./

# Copiar código fuente
COPY src ./src
COPY public ./public
# COPY payload.config.ts ./
COPY .env* ./

# Variables de entorno para optimizar el build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV SKIP_TYPE_CHECK=true

# Build con optimizaciones
RUN bun run build

# Imagen de producción final
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario y grupo
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar archivos públicos si existen
COPY --from=builder /app/public ./public

# Crear directorio .next con permisos correctos
RUN mkdir .next && chown nextjs:nodejs .next

# Copiar solo dependencias de producción
COPY --from=deps /app/node_modules ./node_modules

# Copiar output del build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiar archivos de configuración necesarios
COPY --from=builder --chown=nextjs:nodejs /app/payload.config.ts ./

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["bun", "run", "server.js"]