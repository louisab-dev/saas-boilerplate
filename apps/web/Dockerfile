FROM node:20-alpine AS base

# Install dependencies and build
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

# Copy root package.json and workspace files
COPY package.json pnpm-lock.yaml* .npmrc* ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/api/package.json ./packages/api/package.json
COPY packages/db/package.json ./packages/db/package.json

# Install dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Copy all source files
COPY . .

# Build prisma client (WORKAROUND: it should be working with just pnpm --filter db run db:generate, but it's not)
WORKDIR /app/packages/db
RUN npm install -g prisma zod-prisma typescript
RUN npx prisma generate

# Next.js build
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build and static files
COPY --from=base /app/apps/web/.next/standalone ./apps/web/
COPY --from=base /app/apps/web/.next/static ./apps/web/apps/web/.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/apps/web/server.js"]
