# Build stage
FROM node:20-alpine as builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /usr/src/app/dist ./dist

USER node
CMD ["node", "dist/main.js"]