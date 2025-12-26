#!/usr/bin/env bash

echo "Building Docker image..."

docker build -t glework-frontend:latest .

echo "Done! Image size:"
docker images glework-frontend:latest

echo ""
echo "To run: docker run -p 8080:80 glework-frontend:latest"
