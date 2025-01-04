FROM node:20.18.1-alpine3.20 AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy all files first to ensure proper dependency resolution
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/server/ ./apps/server/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Build packages in order
RUN pnpm --filter @my/db build
RUN pnpm --filter @my/api build
RUN pnpm --filter @my/server build

# Production stage
FROM node:20.18.1-alpine3.20
WORKDIR /app

# Install pnpm and curl
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    apk add --no-cache curl

# Copy all necessary files from builder
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/server ./apps/server
COPY --from=builder /app/node_modules ./node_modules

# Set production environment
ENV NODE_ENV=production

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:4000/health || exit 1

# Start the server
CMD ["pnpm", "--filter", "@my/server", "start"]
