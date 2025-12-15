# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* bun.lockb* ./
RUN npm ci || npm install

# Build
COPY . .
RUN npm run build

# --- Runtime image (serve static via nginx) ---
FROM nginx:alpine AS runtime

# Nginx config for SPA fallback to index.html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Static files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
