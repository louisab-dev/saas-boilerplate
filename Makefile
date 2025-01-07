# Variables
DC = docker compose
EXEC = $(DC) exec

# Development commands
.PHONY: up down restart logs ps clean rebuild dev db-push

# Start all services
up:
	$(DC) up -d

# Stop all services
down:
	$(DC) down

# Restart all services
restart: down up

# View logs from all services
logs:
	$(DC) logs -f

# Show running containers
ps:
	$(DC) ps

# Clean up containers, volumes, and images
clean:
	$(DC) down -v --rmi local

# Rebuild and start services
rebuild:
	$(DC) build
	$(DC) up -d

# Development setup (starts only necessary services)
dev:
	$(DC) up -d postgres redis api

# Push Prisma schema to database (inside api container)
db-push:
	$(EXEC) api pnpm --filter db run db:push

# Service-specific commands
.PHONY: api-logs web-logs studio-logs api-shell web-shell studio-shell redis-cli

# View logs for specific services
api-logs:
	$(DC) logs -f api

web-logs:
	$(DC) logs -f web

studio-logs:
	$(DC) logs -f studio

# Shell access to services
api-shell:
	$(EXEC) api sh

web-shell:
	$(EXEC) web sh

studio-shell:
	$(EXEC) studio sh

# Redis CLI access
redis-cli:
	$(EXEC) redis redis-cli
