# AICO Resolution Backend

Spring Boot backend for the project, using PostgreSQL.

## Tech stack

- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- PostgreSQL

## Quick start

### 1) Start PostgreSQL

```bash
docker compose up -d
```

### 2) Run API

```bash
mvn spring-boot:run
```

API base URL: `http://localhost:8080`

## Environment variables

Copy `.env.example` values into your shell or system env.

- `DB_URL` (default: `jdbc:postgresql://localhost:5432/aicoresolution`)
- `DB_USERNAME` (default: `postgres`)
- `DB_PASSWORD` (default: `postgres`)
- `APP_CORS_ALLOWED_ORIGINS` (default: `http://localhost:5173,http://127.0.0.1:5173`)
- `APP_UPLOAD_DIR` (default: `D:/Works/uploads`)

## Endpoints

### Health check

- `GET /api/health`

Response:

```json
{
  "status": "ok"
}
```
