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

## Admin bootstrap

On startup, the backend seeds an admin account if the username does not exist yet.
The credentials come from environment variables:

- `APP_SEED_ADMIN_USERNAME`
- `APP_SEED_ADMIN_PASSWORD`

Use these values when calling `POST /api/auth/login`.

## Database tables

- `users`
  - `id` (UUID, PK)
  - `username` (unique)
  - `password_hash`
  - `role`
  - `created_at`

- `posts`
  - `id` (UUID, PK)
  - `title`
  - `slug` (unique)
  - `excerpt`
  - `content`
  - `thumbnail_url`
  - `status` (`DRAFT` or `PUBLISHED`)
  - `published_at`
  - `created_at`
  - `updated_at`
  - `created_by` (FK -> `users.id`)
  - `updated_by` (FK -> `users.id`)

## Endpoints

### Health check

- `GET /api/health`

Response:

```json
{
  "status": "ok"
}
```

### Auth

- `POST /api/auth/login`
  - Request body:

```json
{
  "username": "your_admin_username",
  "password": "your_admin_password"
}
```

- Response body:

```json
{
  "accessToken": "...",
  "tokenType": "Bearer",
  "expiresInSeconds": 7200
}
```

### Public posts

- `GET /api/posts?page=0&size=10`
- `GET /api/posts/{slug}`

### Admin posts (requires Bearer token)

- `GET /api/admin/posts?page=0&size=10`
- `GET /api/admin/posts/{id}`
- `POST /api/admin/posts`
- `PUT /api/admin/posts/{id}`
- `DELETE /api/admin/posts/{id}`

### Admin media (requires Bearer token)

- `POST /api/admin/media/upload` (multipart form-data, field: `file`)

Response body:

```json
{
  "url": "/uploads/<filename>"
}
```
