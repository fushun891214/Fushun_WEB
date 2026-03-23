# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run generate

# Stage 2: Serve
FROM node:20-alpine

WORKDIR /app
RUN npm install -g http-server

COPY --from=builder /app/.output/public ./public

EXPOSE 8080
CMD ["http-server", "./public", "-p", "8080", "-c-1"]
