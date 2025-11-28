# syntax=docker.io/docker/dockerfile:1

FROM node:lts-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install dependencies with bun
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
COPY package.json pnpm-lock.yaml .npmrc* ./

# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

RUN corepack enable && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

# Declarar los argumentos de build y convertir ARG a ENV para que estén disponibles en runtime
ARG DATABASE_URI
ENV DATABASE_URI=$DATABASE_URI
ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ARG R2_ACCOUNT_ID
ENV R2_ACCOUNT_ID=$R2_ACCOUNT_ID
ARG R2_ACCESS_KEY_ID
ENV R2_ACCESS_KEY_ID=$R2_ACCESS_KEY_ID
ARG R2_SECRET_ACCESS_KEY
ENV R2_SECRET_ACCESS_KEY=$R2_SECRET_ACCESS_KEY
ARG R2_BUCKET
ENV R2_BUCKET=$R2_BUCKET
ARG R2_URL
ENV R2_URL=$R2_URL
ARG R2_TOKEN
ENV R2_TOKEN=$R2_TOKEN
ARG EMAIL_FROM_ADDRESS
ENV EMAIL_FROM_ADDRESS=$EMAIL_FROM_ADDRESS
ARG EMAIL_FROM_NAME
ENV EMAIL_FROM_NAME=$EMAIL_FROM_NAME
ARG EMAIL_SMTP_HOST
ENV EMAIL_SMTP_HOST=$EMAIL_SMTP_HOST
ARG EMAIL_SMTP_PORT
ENV EMAIL_SMTP_PORT=$EMAIL_SMTP_PORT
ARG EMAIL_AUTH_USER
ENV EMAIL_AUTH_USER=$EMAIL_AUTH_USER
ARG EMAIL_AUTH_PASS
ENV EMAIL_AUTH_PASS=$EMAIL_AUTH_PASS

# RUN \
#   if [ -f yarn.lock ]; then yarn run build; \
#   elif [ -f package-lock.json ]; then npm run build; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
#   else echo "Lockfile not found." && exit 1; \
#   fi
RUN corepack enable && pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Remove this line if you do not have this folder
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]