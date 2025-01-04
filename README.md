# Self-Hosted SaaS Boilerplate

A production-ready boilerplate for building self-hosted SaaS applications,
designed for easy deployment on [Coolify](https://coolify.io/). This monorepo
template provides a modern, scalable architecture using Next.js, tRPC, Express,
and PostgreSQL.

## 🏗 Architecture

- **Frontend**: Next.js application for a fast, SEO-friendly web interface
- **Backend**: Express server with tRPC for type-safe API communications
- **Database**: PostgreSQL for reliable data storage
- **Cache**: Redis for session management and rate limiting
- **Monitoring**: Built-in health checks for all services
- **Developer Tools**: Prisma Studio for database management

## 🚀 Features

- **Type Safety**: End-to-end type safety with TypeScript and tRPC
- **Scalability**: Separate API and web services for independent scaling
- **Development Tools**:
  - Prisma Studio for database management
  - tRPC Panel for API exploration
  - Hot reloading for rapid development
- **Security**:
  - Rate limiting (Redis-backed)
  - CORS configuration
  - Environment-based security controls
- **Infrastructure**:
  - Docker Compose setup for local development
  - Production-ready Dockerfiles
  - Health checks for all services
  - Volume persistence for databases

## 📁 Project Structure

```
.
├── apps/
│   ├── web/          # Next.js frontend application
│   └── server/       # Express + tRPC API server
├── packages/
│   ├── api/          # tRPC router definitions
│   └── db/          # Database schema and migrations
├── docker-compose.yml
└── package.json
```

## ⚙️ Setup & Development

1. Clone the repository:

   ```bash
   git clone https://github.com/louisab-dev/saas-boilerplate.git
   cd saas-boilerplate
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start the development environment:
   ```bash
   docker compose up
   ```

This will start:

- Next.js frontend on `http://localhost:3000`
- tRPC API on `http://localhost:4000`
- Prisma Studio on `http://localhost:5555`
- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`

## 🌐 Deployment

This boilerplate is designed to be easily deployed on
[Coolify](https://coolify.io/).

### Prerequisites

- A Coolify instance
- PostgreSQL database
- Redis instance (optional, but recommended for production)

### Configuration

1. Fork this repository
2. Set up necessary environment variables in Coolify
3. Deploy using Coolify's GitHub integration

## ⚠️ Current Limitations

- **Authentication**: Supabase Auth integration is planned but not yet
  implemented in the Docker Compose setup
- **Email Services**: Email service integration pending
- **File Storage**: File storage solution not yet implemented

## 🛣️ Roadmap

- [ ] Complete Supabase Auth integration
- [ ] Add email service integration
- [ ] Implement file storage solution
- [ ] Add monitoring and logging stack
- [ ] Create backup solutions
- [ ] Add CI/CD templates

## 📝 Environment Variables

Required environment variables:

```bash
# Database
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=

# API
API_PORT=
API_URL=
AUTH_JWT_SECRET=
NODE_ENV=

# Redis
REDIS_PORT=

# tRPC Panel (optional)
TRPC_PANEL_USERNAME=
TRPC_PANEL_PASSWORD=

# Supabase (pending implementation)
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License.
