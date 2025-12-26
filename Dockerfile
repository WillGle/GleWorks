# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --prefer-offline --no-audit

# Copy source code
COPY . .

# Build with Vite
RUN npm run build

# Verify build output
RUN ls -lah dist/ && \
    test -f dist/index.html || (echo "Build failed: index.html not found" && exit 1)

# Stage 2: Production with Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/*

# Copy custom nginx config for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Add runtime config injection entrypoint
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Create health check endpoint
RUN echo "healthy" > /usr/share/nginx/html/health

# Add build metadata
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION

LABEL org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.image.version=$VERSION \
      org.opencontainers.image.title="GitWork Frontend" \
      org.opencontainers.image.description="React + TypeScript + Vite service booking platform"

# Generate build info at runtime
RUN echo "{ \
  \"framework\": \"React + TypeScript + Vite\", \
  \"buildDate\": \"$BUILD_DATE\", \
  \"version\": \"$VERSION\", \
  \"commit\": \"$VCS_REF\" \
}" > /usr/share/nginx/html/build-info.json

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/health || exit 1

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
