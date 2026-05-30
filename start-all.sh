#!/bin/bash

# DocChat - Start All Services Script
# This script starts both frontend and backend servers

echo "================================"
echo "DocChat - Multi-Service Startup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if required commands exist
command -v node &> /dev/null || { echo "Node.js not found. Please install Node.js"; exit 1; }
command -v python3 &> /dev/null || { echo "Python not found. Please install Python"; exit 1; }

echo -e "${BLUE}Starting DocChat services...${NC}\n"

# Start backend
echo -e "${YELLOW}Starting FastAPI Backend...${NC}"
cd backend
uv run main.py &
BACKEND_PID=$!
echo -e "${GREEN}Backend started (PID: $BACKEND_PID)${NC}"
echo "Backend URL: http://localhost:8000"
echo ""

# Wait a moment for backend to start
sleep 3

# Start frontend
echo -e "${YELLOW}Starting Next.js Frontend...${NC}"
cd ..
pnpm dev &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started (PID: $FRONTEND_PID)${NC}"
echo "Frontend URL: http://localhost:3000"
echo ""

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}All services started!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Frontend:  http://localhost:3000"
echo "Backend:   http://localhost:8000/docs"
echo ""
echo "To stop all services, press Ctrl+C"
echo ""

# Keep script running
wait
