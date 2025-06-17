FROM oven/bun:1-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json bun.lockb* ./

# Instalar dependencias con cache
RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# Copiar código fuente
COPY . .

# Build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Cambiar ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["bun", "server.js"]