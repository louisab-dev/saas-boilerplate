# Variables
DC = docker compose
DC_LOCAL = docker compose -f docker-compose.yml -f docker-compose.local.yml
EXEC = $(DC) exec
EXEC_LOCAL = $(DC_LOCAL) exec

# Development commands
.PHONY: up down restart logs ps clean rebuild dev db-push db-seed up-local down-local restart-local

# Start all services (production)
up:
	$(DC) up -d

# Start all services (local development)
up-local:
	$(DC_LOCAL) up -d

# Stop all services (production)
down:
	$(DC) down

# Stop all services (local development)
down-local:
	$(DC_LOCAL) down

# Restart all services (production)
restart: down up

# Restart all services (local development)
restart-local: down-local up-local

# View logs from all services
logs:
	$(DC) logs -f

logs-local:
	$(DC_LOCAL) logs -f

# Show running containers
ps:
	$(DC) ps

ps-local:
	$(DC_LOCAL) ps

# Clean up containers, volumes, and images
clean:
	$(DC) down -v --rmi local

clean-local:
	$(DC_LOCAL) down -v --rmi local

# Rebuild and start services
rebuild:
	$(DC) build
	$(DC) up -d

rebuild-local:
	$(DC_LOCAL) build
	$(DC_LOCAL) up -d

# Development setup (starts only necessary services)
dev:
	$(DC) up -d postgres redis api

dev-local:
	$(DC_LOCAL) up -d postgres redis api

# Push Prisma schema to database (inside api container)
db-push:
	$(EXEC) api pnpm --filter db run db:push

db-push-local:
	$(EXEC_LOCAL) api pnpm --filter db run db:push

# Seed database with sample data (inside api container)
db-seed:
	$(EXEC) api pnpm --filter api run db:seed

db-seed-local:
	$(EXEC_LOCAL) api pnpm --filter api run db:seed

# Service-specific commands
.PHONY: api-logs web-logs studio-logs api-shell web-shell studio-shell redis-cli api-logs-local web-logs-local studio-logs-local api-shell-local web-shell-local studio-shell-local redis-cli-local

# View logs for specific services
api-logs:
	$(DC) logs -f api

web-logs:
	$(DC) logs -f web

studio-logs:
	$(DC) logs -f studio

api-logs-local:
	$(DC_LOCAL) logs -f api

web-logs-local:
	$(DC_LOCAL) logs -f web

studio-logs-local:
	$(DC_LOCAL) logs -f studio

# Shell access to services
api-shell:
	$(EXEC) api sh

web-shell:
	$(EXEC) web sh

studio-shell:
	$(EXEC) studio sh

api-shell-local:
	$(EXEC_LOCAL) api sh

web-shell-local:
	$(EXEC_LOCAL) web sh

studio-shell-local:
	$(EXEC_LOCAL) studio sh

# Redis CLI access
redis-cli:
	$(EXEC) redis redis-cli

redis-cli-local:
	$(EXEC_LOCAL) redis redis-cli
