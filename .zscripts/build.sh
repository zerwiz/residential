#!/bin/bash

# Redirect stderr to stdout to avoid errors with execute_command
exec 2>&1

set -e

# Get script directory (.zscripts)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Next.js project directory
NEXTJS_PROJECT_DIR="/home/z/my-project"

# Check if Next.js project directory exists
if [ ! -d "$NEXTJS_PROJECT_DIR" ]; then
    echo "❌ ERROR: Next.js project directory does not exist: $NEXTJS_PROJECT_DIR"
    exit 1
fi

echo "🚀 Building Next.js application and mini-services..."
echo "📁 Next.js project path: $NEXTJS_PROJECT_DIR"

cd "$NEXTJS_PROJECT_DIR" || exit 1

export NEXT_TELEMETRY_DISABLED=1

BUILD_DIR="/tmp/build_fullstack_$BUILD_ID"
echo "📁 Cleaning and creating build directory: $BUILD_DIR"
mkdir -p "$BUILD_DIR"

echo "📦 Installing dependencies..."
bun install

echo "🔨 Building Next.js application..."
bun run build

# Build mini-services
if [ -d "$NEXTJS_PROJECT_DIR/mini-services" ]; then
    echo "🔨 Building mini-services..."
    sh "$SCRIPT_DIR/mini-services-install.sh"
    sh "$SCRIPT_DIR/mini-services-build.sh"

    echo "  - Copying mini-services-start.sh to $BUILD_DIR"
    cp "$SCRIPT_DIR/mini-services-start.sh" "$BUILD_DIR/mini-services-start.sh"
    chmod +x "$BUILD_DIR/mini-services-start.sh"
else
    echo "ℹ️  mini-services directory not found, skipping"
fi

echo "📦 Collecting build artifacts to $BUILD_DIR..."

if [ -d ".next/standalone" ]; then
    echo "  - Copying .next/standalone"
    cp -r .next/standalone "$BUILD_DIR/next-service-dist/"
fi

if [ -d ".next/static" ]; then
    echo "  - Copying .next/static"
    mkdir -p "$BUILD_DIR/next-service-dist/.next"
    cp -r .next/static "$BUILD_DIR/next-service-dist/.next/"
fi

if [ -d "public" ]; then
    echo "  - Copying public"
    cp -r public "$BUILD_DIR/next-service-dist/"
fi

if [ -f "./db/custom.db" ]; then
    echo "🗄️  Copying test environment database to build artifacts..."
    mkdir -p "$BUILD_DIR/db"
    cp -r ./db/. "$BUILD_DIR/db/"

    echo "🗄️  Synchronizing database structure in build artifacts..."
    DATABASE_URL="file:$BUILD_DIR/db/custom.db" bun run db:push
    echo "✅ Build artifacts database is ready"
    ls -lah "$BUILD_DIR/db"
else
    echo "❌ Test environment database file ./db/custom.db not found, cannot continue building production package"
    exit 1
fi

if [ -f "Caddyfile" ]; then
    echo "  - Copying Caddyfile"
    cp Caddyfile "$BUILD_DIR/"
else
    echo "ℹ️  Caddyfile not found, skipping"
fi

echo "  - Copying start.sh to $BUILD_DIR"
cp "$SCRIPT_DIR/start.sh" "$BUILD_DIR/start.sh"
chmod +x "$BUILD_DIR/start.sh"

PACKAGE_FILE="${BUILD_DIR}.tar.gz"
echo ""
echo "📦 Packaging build artifacts to $PACKAGE_FILE..."
cd "$BUILD_DIR" || exit 1
tar -czf "$PACKAGE_FILE" .
cd - > /dev/null || exit 1

echo ""
echo "✅ Build complete! All artifacts packaged to $PACKAGE_FILE"
echo "📊 Package file size:"
ls -lh "$PACKAGE_FILE"
