# GasDetection Docker Infrastructure

This directory contains Docker configurations for the GasDetection application with support for multiple environments.

## 📁 Directory Structure

```
infra/docker/
├── Dockerfile.backend          # Backend production image
├── Dockerfile.frontend         # Frontend production image (with nginx)
├── Dockerfile.frontend.dev     # Frontend development image
├── docker-compose.yml          # Base configuration
├── docker-compose.dev.yml      # Development overrides
├── docker-compose.prod.yml     # Production overrides (no nginx)
├── docker-compose.prod-local.yml # Production local with nginx
├── nginx/
│   ├── nginx.conf             # Main nginx configuration
│   └── default.conf           # Site configuration
├── .env.example               # Environment variables template
├── .dockerignore              # Files to exclude from build
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- Docker Desktop for Windows (with WSL2 backend recommended)
- Docker Compose V2

### Development Environment

Run the application in development mode with hot-reloading:

```bash
# From project root
cd infra/docker

# Start services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml -p falsesignal-dev up -d --build

# Or in detached mode
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
```

**Access:**
- Frontend: http://127.0.0.1:5173
- Backend API: http://127.0.0.1:8000
- Backend Docs: http://127.0.0.1:8000/docs

### Production Environment (Server Deployment)

For server deployment where nginx is configured separately:

```bash
# From project root
cd infra/docker

# Build and start services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml -p falsesignal-prod up -d --build

# View logs
docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
```

**Access:**
- Backend API: http://127.0.0.1:8000 (configure your nginx to proxy this)
- Frontend: http://127.0.0.1:8080 (configure your nginx to proxy this)

### Production-like Local Environment (with Nginx)

For local testing with nginx (mimics production setup):

```bash
# From project root
cd infra/docker

# Build and start all services including nginx
docker-compose -f docker-compose.yml -f docker-compose.prod.yml -f docker-compose.prod-local.yml -p falsesignal-prod-local up -d
 --build

# View logs
docker-compose -f docker-compose.yml -f docker-compose.prod.yml -f docker-compose.prod-local.yml logs -f

# Stop services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml -f docker-compose.prod-local.yml down
```

**Access:**
- Application: http://127.0.0.1
- Frontend: http://127.0.0.1/GasDetection/
- Backend API: http://127.0.0.1/api/

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and adjust values:

```bash
cp .env.example .env
```

### Port Configuration

All services bind to `127.0.0.1` for security:

- **Development:**
  - Backend: 127.0.0.1:8000
  - Frontend: 127.0.0.1:5173

- **Production:**
  - Backend: 127.0.0.1:8000
  - Frontend: 127.0.0.1:8080

- **Production Local (with nginx):**
  - Nginx: 127.0.0.1:80
  - Backend: Internal only
  - Frontend: Internal only

## 🛠️ Common Commands

### Build Images

```bash
# Build all images
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build

# Build specific service
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build backend

# Build without cache
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache
```

### View Logs

```bash
# All services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

# Specific service
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f backend

# Last 100 lines
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs --tail=100
```

### Execute Commands in Containers

```bash
# Backend shell
docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec backend sh

# Frontend shell
docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec frontend sh

# Run backend command
docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec backend python -c "print('Hello')"
```

### Clean Up

```bash
# Stop and remove containers
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down

# Remove volumes as well
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v

# Remove images
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down --rmi all

# Complete cleanup
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v --rmi all --remove-orphans
```

## 🏗️ Architecture

### Development Mode

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├─────────────────────┐
       │                     │
       ▼                     ▼
┌─────────────┐      ┌─────────────┐
│  Frontend   │      │   Backend   │
│  (Vite)     │      │  (FastAPI)  │
│  :5173      │      │   :8000     │
└─────────────┘      └─────────────┘
```

### Production Mode (Server)

```
┌─────────────┐
│ Your Nginx  │ (configured separately)
└──────┬──────┘
       │
       ├─────────────────────┐
       │                     │
       ▼                     ▼
┌─────────────┐      ┌─────────────┐
│  Frontend   │      │   Backend   │
│  (nginx)    │      │  (FastAPI)  │
│  :8080      │      │   :8000     │
└─────────────┘      └─────────────┘
```

### Production Local Mode (with Nginx)

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Nginx    │
│    :80      │
└──────┬──────┘
       │
       ├─────────────────────┐
       │                     │
       ▼                     ▼
┌─────────────┐      ┌─────────────┐
│  Frontend   │      │   Backend   │
│  (nginx)    │      │  (FastAPI)  │
│  internal   │      │  internal   │
└─────────────┘      └─────────────┘
```

## 🔒 Security Notes

1. All services bind to `127.0.0.1` instead of `0.0.0.0` for security
2. Nginx includes security headers (X-Frame-Options, X-Content-Type-Options, etc.)
3. Resource limits are set in production mode
4. Health checks are configured for all services
5. Logs are rotated automatically (max 10MB, 3 files)

## 📝 Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
netstat -ano | findstr :8000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Container Won't Start

```bash
# Check logs
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs backend

# Rebuild without cache
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache backend
```

### Volume Permission Issues

```bash
# Remove volumes and recreate
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

### Network Issues

```bash
# Recreate network
docker network prune
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## 🤝 Contributing

When modifying Docker configurations:

1. Test in development mode first
2. Test in production-local mode
3. Update this README if needed
4. Document any new environment variables in `.env.example`

## 📄 License

Same as the main project.

