# Base image
FROM oven/bun:1 AS base

# Dependencies layer
FROM base AS deps
WORKDIR /app
COPY bun.lock* ./
COPY package.json ./
RUN bun install --frozen-lockfile

# Build layer
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json bun.lock* ./
COPY next.config.mjs ./
COPY tsconfig.json ./
# COPY payload.config.ts ./
COPY public ./public
COPY src ./src
RUN bun run build

# Runner layer
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD HOSTNAME="0.0.0.0" bun server.js