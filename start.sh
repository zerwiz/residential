#!/bin/bash

set -euo pipefail

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

echo "🚀 Residential Development Server"
echo "=================================="
echo ""
echo "Project directory: $PROJECT_DIR"
echo "Port: 3000"
echo ""

cd "$PROJECT_DIR"

# Check if npm is available
if ! command -v npm >/dev/null 2>&1; then
    echo "❌ ERROR: npm is not installed or not in PATH"
    exit 1
fi

echo "✅ npm found - Installing dependencies..."
npm install

echo "✅ Dependencies installed"
echo ""
echo "🚀 Starting development server..."
echo ""
echo "📝 Logs written to: $PROJECT_DIR/dev.log"
echo "🌐 Server running at: http://localhost:3000"
echo ""

# Remove old log file if it exists
rm -f "$PROJECT_DIR/dev.log" 2>/dev/null || true

# Start the dev server with logs to file and real-time display
npm run dev -p 3000 2>&1 | tee "$PROJECT_DIR/dev.log"
