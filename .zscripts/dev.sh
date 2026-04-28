#!/bin/bash

set -euo pipefail

# Get script directory (.zscripts)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

log_step_start() {
    local step_name="$1"
    echo "=========================================="
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting: $step_name"
    echo "=========================================="
    export STEP_START_TIME
    STEP_START_TIME=$(date +%s)
}

log_step_end() {
    local step_name="${1:-Unknown step}"
    local end_time
    end_time=$(date +%s)
    local duration=$((end_time - STEP_START_TIME))
    echo "=========================================="
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Completed: $step_name"
    echo "[LOG] Step: $step_name | Duration: ${duration}s"
    echo "=========================================="
    echo ""
}

start_mini_services() {
    local mini_services_dir="$PROJECT_DIR/mini-services"
    local started_count=0

    log_step_start "Starting mini-services"
    if [ ! -d "$mini_services_dir" ]; then
        echo "Mini-services directory not found, skipping..."
        log_step_end "Starting mini-services"
        return 0
    fi

    echo "Found mini-services directory, scanning for sub-services..."

    for service_dir in "$mini_services_dir"/*; do
        if [ ! -d "$service_dir" ]; then
            continue
        fi

        local service_name
        service_name=$(basename "$service_dir")
        echo "Checking service: $service_name"

        if [ -d "$service_dir" ]; then
            # Check if service has its own start script
            if [ -f "$service_dir/start.sh" ]; then
                echo "  Found start.sh in $service_name, using it."
            else
                # Use the root start.sh
                echo "  No start.sh found in $service_name, using root start.sh."
            fi

            # Check if service should be started
            if [ -f "$service_dir/config.json" ]; then
                echo "  Checking config.json..."
                local skip_start=false
                if [ -f "$service_dir/never_start" ]; then
                    echo "  Service configured to never start, skipping"
                    skip_start=true
                fi

                if [ "$skip_start" = "false" ]; then
                    log_step_start "Starting service: $service_name"
                    (
                        cd "$service_dir"
                        bash "$SCRIPT_DIR/start.sh" &
                        # Record PIDs for cleanup
                        echo "/tmp/zi_pids/$service_name.pids" > ".pids"
                    ) &
                    log_step_end "Starting service: $service_name"
                    ((started_count++))
                fi
            fi
        fi
    done

    log_step_end "Starting mini-services"
    echo "Total mini-services started: $started_count"
}

# Trap cleanup function
cleanup() {
    echo "[ZI] Cleaning up..."
    # Kill all Node processes
    pkill -f "node.*next.*dev" || true
    # Remove pid files
    rm -rf /tmp/zi_pids 2>/dev/null || true
}

trap cleanup EXIT INT TERM

cd "$PROJECT_DIR"

log_step_start "bun install"
echo "[BUN] Installing dependencies..."
bun install
log_step_end "bun install"

log_step_start "bun run db:push"
echo "[BUN] Setting up database..."
bun run db:push
log_step_end "bun run db:push"

log_step_start "Starting Next.js dev server"
echo "[BUN] Starting development server..."
bun run dev -p 3000 2>&1 | tee dev.log &
DEV_PID=$!
log_step_end "Starting Next.js dev server"

log_step_start "Waiting for Next.js dev server"
echo "Waiting for Next.js dev server to start (port 3000)..."
sleep 2
echo "Dev server should now be listening on localhost:3000"
log_step_end "Waiting for Next.js dev server"

log_step_start "Health check"
echo "[BUN] Performing health check..."
if curl -fsS localhost:3000 >/dev/null 2>&1; then
    echo "[BUN] Health check passed"
else
    echo "[BUN] Warning: Health check failed, but server may still be starting..."
fi
log_step_end "Health check"

start_mini_services

echo ""
echo "Next.js dev server is running in background (PID: $DEV_PID)."
echo "Use 'kill $DEV_PID' to stop it."
disown "$DEV_PID" 2>/dev/null || true
unset DEV_PID
