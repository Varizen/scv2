#!/bin/bash

# Labor Migration Platform - Automated Demo Script
# This script automates the process of starting the demo server, 
# running the complete API demo, and shutting down the server.

echo "🚀 Starting Automated Complete Demo"
echo "====================================="

# Configuration
PORT=3001
API_URL="http://localhost:$PORT/api/health"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "👋 Cleaning up..."
    if [ -n "$SERVER_PID" ]; then
        echo "🛑 Stopping demo server (PID: $SERVER_PID)..."
        kill $SERVER_PID
    fi
    echo "✅ Demo execution finished."
}

# Trap signals for cleanup
trap cleanup EXIT INT TERM

# 1. Start Demo Server
echo "📂 Navigating to backend directory..."
cd /Users/shotah/Downloads/dot.Dev/SkillConnect/backend

echo "🔌 Starting demo server on port $PORT..."
node demo-server.js > demo-server.log 2>&1 &
SERVER_PID=$!

echo "🕒 Waiting for server to be ready (at $API_URL)..."
MAX_RETRIES=10
RETRY_COUNT=0
SERVER_READY=false

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s $API_URL > /dev/null; then
        SERVER_READY=true
        break
    fi
    echo "..."
    sleep 2
    RETRY_COUNT=$((RETRY_COUNT + 1))
done

if [ "$SERVER_READY" = false ]; then
    echo "❌ Error: Demo server failed to start within timeout."
    exit 1
fi

echo "✅ Demo server is ready!"

# 2. Run Complete Demo Script
echo ""
echo "📝 Executing complete demo script..."
bash run-complete-demo.sh

# 3. Finalize
echo ""
echo "🏆 Automated demo completed successfully!"
