# Base image
FROM node:lts-alpine AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Declarar los argumentos de build
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_BASE_URL
ARG R2_ACCOUNT_ID
ARG R2_ACCESS_KEY_ID
ARG R2_SECRET_ACCESS_KEY
ARG R2_BUCKET
ARG R2_URL
ARG R2_TOKEN
ARG EMAIL_FROM_ADDRESS
ARG EMAIL_FROM_NAME
ARG EMAIL_SMTP_HOST
ARG EMAIL_SMTP_PORT
ARG EMAIL_AUTH_USER
ARG EMAIL_AUTH_PASS
# Convertir ARG a ENV para que estén disponibles en runtime
ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV R2_ACCOUNT_ID=${R2_ACCOUNT_ID}
ENV R2_ACCESS_KEY_ID=${R2_ACCESS_KEY_ID}
ENV R2_SECRET_ACCESS_KEY=${R2_SECRET_ACCESS_KEY}
ENV R2_BUCKET=${R2_BUCKET}
ENV R2_URL=${R2_URL}
ENV R2_TOKEN=${R2_TOKEN}
ENV EMAIL_FROM_ADDRESS=${EMAIL_FROM_ADDRESS}
ENV EMAIL_FROM_NAME=${EMAIL_FROM_NAME}
ENV EMAIL_SMTP_HOST=${EMAIL_SMTP_HOST}
ENV EMAIL_SMTP_PORT=${EMAIL_SMTP_PORT}
ENV EMAIL_AUTH_USER=${EMAIL_AUTH_USER}
ENV EMAIL_AUTH_PASS=${EMAIL_AUTH_PASS}

# Dependencies layer
FROM base AS deps
WORKDIR /app
COPY package.json ./
# COPY bun.lock ./
RUN npm install

# Build layer
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Runner layer
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    && mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Remove this line if you do not have this folder
COPY --from=builder /app/public ./public

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD HOSTNAME="0.0.0.0" node server.js