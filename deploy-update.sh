#!/bin/bash
#
# AICO Resolution - Deployment Update Script
# Usage: ./deploy-update.sh [backend|frontend|all]
#

set -e

REPO_DIR="/var/www/aicoresolution"
FRONTEND_DEPLOY_DIR="/var/www/html/aicoresolution"
BRANCH="${DEPLOY_BRANCH:-main}"

COLOR_GREEN='\033[0;32m'
COLOR_YELLOW='\033[1;33m'
COLOR_RED='\033[0;31m'
COLOR_RESET='\033[0m'

log_info() {
    echo -e "${COLOR_GREEN}[INFO]${COLOR_RESET} $1"
}

log_warn() {
    echo -e "${COLOR_YELLOW}[WARN]${COLOR_RESET} $1"
}

log_error() {
    echo -e "${COLOR_RED}[ERROR]${COLOR_RESET} $1"
}

pull_code() {
    log_info "Pulling latest code from branch: $BRANCH"
    cd "$REPO_DIR"
    git fetch origin
    git pull origin "$BRANCH"
}

update_backend() {
    log_info "=== Updating Backend ==="

    cd "$REPO_DIR/backend"

    log_info "Stopping backend containers..."
    docker-compose -f docker-compose.prod.yml down

    log_info "Building and starting backend..."
    docker-compose -f docker-compose.prod.yml up -d --build

    log_info "Waiting for backend to start (10 seconds)..."
    sleep 10

    log_info "Checking backend health..."
    if curl -sf http://localhost:7080/api/v1/health > /dev/null; then
        log_info "✓ Backend is healthy"
    else
        log_error "✗ Backend health check failed"
        log_warn "Check logs: docker-compose -f $REPO_DIR/backend/docker-compose.prod.yml logs -f backend"
        exit 1
    fi
}

update_frontend() {
    log_info "=== Updating Frontend ==="

    cd "$REPO_DIR"

    log_info "Installing dependencies..."
    npm install

    log_info "Building frontend..."
    npm run build

    log_info "Deploying frontend..."
    rm -rf "$FRONTEND_DEPLOY_DIR"/*
    cp -r dist/* "$FRONTEND_DEPLOY_DIR/"
    chown -R www-data:www-data "$FRONTEND_DEPLOY_DIR"

    log_info "✓ Frontend deployed successfully"
}

backup_database() {
    log_info "=== Creating Database Backup ==="

    BACKUP_DIR="/opt/backups/database"
    mkdir -p "$BACKUP_DIR"

    BACKUP_FILE="$BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql"

    log_info "Backing up database to: $BACKUP_FILE"
    docker exec aicoresolution-db-prod pg_dump -U aicoresolution_user aicoresolution_prod > "$BACKUP_FILE"

    if [ -f "$BACKUP_FILE" ]; then
        log_info "✓ Database backup created: $BACKUP_FILE"
    else
        log_error "✗ Database backup failed"
        exit 1
    fi
}

show_status() {
    log_info "=== Deployment Status ==="

    echo ""
    log_info "Docker Containers:"
    docker-compose -f "$REPO_DIR/backend/docker-compose.prod.yml" ps

    echo ""
    log_info "Backend Health:"
    curl -s http://localhost:7080/api/v1/health || echo "Failed"

    echo ""
    log_info "Public Health:"
    curl -s http://aicorelabs.net/api/v1/health || echo "Failed"

    echo ""
    log_info "Recent Backend Logs:"
    docker-compose -f "$REPO_DIR/backend/docker-compose.prod.yml" logs --tail=20 backend
}

usage() {
    echo "Usage: $0 [backend|frontend|all] [--backup]"
    echo ""
    echo "Options:"
    echo "  backend   - Update backend only"
    echo "  frontend  - Update frontend only"
    echo "  all       - Update both backend and frontend (default)"
    echo "  --backup  - Create database backup before update"
    echo ""
    echo "Environment Variables:"
    echo "  DEPLOY_BRANCH - Git branch to deploy (default: main)"
    echo ""
    echo "Examples:"
    echo "  $0 all --backup"
    echo "  $0 backend"
    echo "  DEPLOY_BRANCH=feat/new-feature $0 all"
    exit 1
}

# Main
main() {
    local COMPONENT="${1:-all}"
    local BACKUP=false

    # Parse arguments
    for arg in "$@"; do
        case $arg in
            --backup)
                BACKUP=true
                shift
                ;;
            --help|-h)
                usage
                ;;
        esac
    done

    log_info "======================================="
    log_info "AICO Resolution Deployment Update"
    log_info "Branch: $BRANCH"
    log_info "Component: $COMPONENT"
    log_info "======================================="
    echo ""

    # Confirm
    read -p "Continue with deployment? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_warn "Deployment cancelled"
        exit 0
    fi

    # Backup if requested
    if [ "$BACKUP" = true ]; then
        backup_database
    fi

    # Pull code
    pull_code

    # Update components
    case $COMPONENT in
        backend)
            update_backend
            ;;
        frontend)
            update_frontend
            ;;
        all)
            update_backend
            update_frontend
            ;;
        *)
            log_error "Invalid component: $COMPONENT"
            usage
            ;;
    esac

    echo ""
    log_info "=== Deployment Complete ==="
    echo ""

    # Show status
    show_status

    echo ""
    log_info "Useful commands:"
    echo "  Backend logs: docker-compose -f $REPO_DIR/backend/docker-compose.prod.yml logs -f backend"
    echo "  Nginx logs: tail -f /var/log/nginx/error.log"
    echo "  Restart backend: docker-compose -f $REPO_DIR/backend/docker-compose.prod.yml restart backend"
}

# Run main
main "$@"
