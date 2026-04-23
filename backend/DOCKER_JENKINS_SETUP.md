# Docker & Jenkins Setup Guide

## 📦 Docker Files

### **Dockerfile**

Multi-stage build để tối ưu image size:

1. **Builder stage:** Maven build Java 17
2. **Runtime stage:** Alpine JRE 17 (lightweight)
3. Health check: `GET /api/health`
4. Tạo tự động `/app/uploads` directory

**Build:**

```bash
docker build -t aicoresolution-backend:latest .
```

**Run:**

```bash
docker run -p 8080:8080 \
  -e DB_URL=jdbc:postgresql://postgres:5432/aicoresolution \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=postgres \
  -e APP_JWT_SECRET=your-secret \
  aicoresolution-backend:latest
```

---

### **.dockerignore**

Loại bỏ file không cần:

- Target, build artifacts
- .git, logs
- IDE configs (.idea, \*.iml)
- Node modules, env files

---

### **docker-compose.dev.yml**

Development environment (local):

- PostgreSQL 16 Alpine
- Backend tự build từ Dockerfile
- Health checks cho cả services
- Volume mount cho code & uploads
- Network: `aicoresolution-network`

**Usage:**

```bash
# Start services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f backend

# Stop
docker-compose -f docker-compose.dev.yml down
```

**Services:**

- PostgreSQL: `localhost:5432`
- Backend: `localhost:8080`
- API Health: `GET http://localhost:8080/api/health`

---

### **docker-compose.staging.yml**

Staging environment (pre-production testing):

- PostgreSQL 16 Alpine (separate DB)
- Backend container (pre-built image từ registry)
- Port: 8082 (không conflict với dev/prod)
- Dùng .env.staging variables
- Similar to prod nhưng ít strict hơn

**Usage:**

```bash
# Create .env.staging file
cat > .env.staging << EOF
POSTGRES_DB_STAGING=aicoresolution_staging
POSTGRES_USER_STAGING=postgres
POSTGRES_PASSWORD_STAGING=your-staging-password
APP_JWT_SECRET_STAGING=your-staging-jwt-secret
APP_ACCESS_TOKEN_MINUTES=15
APP_REFRESH_TOKEN_MINUTES=10080
APP_CORS_ALLOWED_ORIGINS_STAGING=https://staging.yourdomain.com
DOCKER_REGISTRY=registry.example.com
IMAGE_TAG=latest
EOF

# Start services
docker-compose -f docker-compose.staging.yml up -d

# View logs
docker-compose -f docker-compose.staging.yml logs -f backend
```

**Services:**

- PostgreSQL: `localhost:5433` (different port from prod 5432)
- Backend: `localhost:8082`
- API Health: `GET http://localhost:8082/api/health`

---

### **docker-compose.prod.yml**

Production environment:

- Sử dụng pre-built image từ Docker registry
- Environment variables từ `.env` file
- Production logging (max 10MB per file, max 3 files)
- Persistent volumes với local driver
- Health checks enabled

**Usage:**

```bash
# Create .env file
cat > .env << EOF
POSTGRES_DB=aicoresolution
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
APP_JWT_SECRET=your-production-jwt-secret
APP_ACCESS_TOKEN_MINUTES=15
APP_REFRESH_TOKEN_MINUTES=10080
APP_CORS_ALLOWED_ORIGINS=https://yourdomain.com
DOCKER_REGISTRY=registry.example.com
IMAGE_TAG=1.0.0
EOF

# Start services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f backend
```

---

## Jenkinsfile

### **Pipeline Stages**

#### 1. **Checkout**

- Clone repository
- Show last commit log

#### 2. **Build**

- Maven clean package
- Compile code
- Output: `backend-0.0.1-SNAPSHOT.jar`

#### 3. **Test**

- Run unit tests
- Display results

#### 4. **SonarQube Analysis** (main branch only)

- Code quality scanning
- Security vulnerabilities
- Test coverage

#### 5. **Build Docker Image**

- Build 2 tags: `${IMAGE_TAG}` + `latest`
- Conditional: only on main branch

#### 6. **Push Docker Image** (main branch only)

- Push to Docker registry
- Both tags

#### 7. **Deploy to Dev** (develop branch)

- Deploy to development environment
- Script: `docker-compose -f docker-compose.dev.yml`

#### 8. **Deploy to Prod** (main branch)

- Requires input approval
- Deploy to production
- Script: `docker-compose -f docker-compose.prod.yml`

---

### **Environment Variables (Jenkins Credentials)**

Required Jenkins credentials:

```
docker-registry-url          → Docker registry URL
docker-registry-credentials  → Docker login credentials
db-url                       → Database URL
db-username                  → Database username
db-password                  → Database password
app-jwt-secret               → JWT secret key
```

**Setup in Jenkins:**

1. Dashboard → Manage Jenkins → Manage Credentials
2. Add each credential with matching ID above
3. Reference in Jenkinsfile: `credentials('id')`

---

### **Pipeline Notifications**

Post-build actions (currently commented):

- Email notifications on success/failure
- SlackCopying notifications
- Build status indicators

**Enable:**

```groovy
post {
    success {
        mail to: 'team@example.com',
             subject: "Build Success: ${env.JOB_NAME}",
             body: "Build completed successfully!"
    }
    failure {
        mail to: 'team@example.com',
             subject: "Build Failed: ${env.JOB_NAME}",
             body: "Build failed. Check: ${env.BUILD_URL}"
    }
}
```

---

## 🚀 Deployment Flow

```
┌─────────────┐
│  Developer  │
│ Push Code   │
└──────┬──────┘
       │ (Git Push)
       ▼
┌─────────────────────────┐
│  Jenkins Pipeline       │
├─────────────────────────┤
│ 1. Checkout             │
│ 2. Build (Maven)        │
│ 3. Test                 │
│ 4. SonarQube (main)     │
│ 5. Build Docker Image   │
│ 6. Push to Registry     │
└──────┬──────────────────┘
       │
       ├─ develop ─────▶ Deploy Dev (auto)
       │
       ├─ release/* ───▶ Deploy Staging (manual approval)
       │
       └─ main ────────▶ Deploy Prod (manual approval)
```

**Branch Strategy:**

- `develop` → Dev (auto deploy)
- `release/*` → Staging (manual approval)
- `main` → Production (manual approval + test staging first)

---

## Troubleshooting

### **Docker Build Stuck**

- Check Maven cache: `docker system prune`
- Increase Docker memory: Settings → Resources → Memory

### **Container Won't Start**

- Check logs: `docker-compose logs -f backend`
- Verify env vars in docker-compose.yml
- Database not ready: Wait for health check pass

### **Jenkins Pipeline Fails**

- **Build stage:** Check Maven version, Java path
- **Docker stage:** Ensure Docker daemon running
- **Credentials:** Verify all Jenkins credentials exist
- **Network:** Check firewall for Docker registry access

### **Slow Image Build**

- Use `.dockerignore` to exclude unnecessary files
- Multi-stage build reduces final size (~200MB → ~100MB)
- Consider caching layers in CI/CD

---

## Image Sizes

```
Builder stage:    ~600MB (maven:3.9-eclipse-temurin-17)
Runtime stage:    ~160MB (eclipse-temurin:17-jre-alpine + jar)
Final image:      ~200MB
```

---

## Security Notes

- **JWT Secret:** Change `APP_JWT_SECRET` in production
- **Database Password:** Use strong password, store in Jenkins secrets
- **Docker Registry:** Use private registry, enable authentication
- **Logs:** Rotate logs to prevent disk full
- **CORS:** Restrict to specific domains in production

---

## Common Commands

```bash
# Development
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down

# Production
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f backend
docker logs -f aicoresolution-backend-dev

# Rebuild image
docker-compose -f docker-compose.dev.yml build --no-cache

# Clean up
docker system prune -a
```
