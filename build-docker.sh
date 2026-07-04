#!/usr/bin/env bash

# Default to current date-time (e.g., 20260610-180135) if no tag is provided
TAG="${1:-$(date +%Y%m%d-%H%M%S)}"
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')

echo "Building Frontend Docker image with tag: ${TAG}..."
docker build \
  --label "build-date=${BUILD_DATE}" \
  -t glework-frontend:${TAG} .

echo "Done! Image sizes:"
docker images glework-frontend:${TAG}

echo ""
echo "To run the container:"
echo "  docker run -p 8080:80 glework-frontend:${TAG}"
echo ""
echo "Or use docker-compose with the tag:"
echo "  TAG=${TAG} docker compose up"

