# Stage 1: Build the frontend
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Final production image
FROM node:20-alpine
WORKDIR /app

# Install Nginx
RUN apk add --no-cache nginx

# Copy built frontend assets to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy server.js and its dependencies
COPY --from=build /app/server.js ./
COPY --from=build /app/package*.json ./
RUN npm ci --only=production

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Copy and setup entrypoint script
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Expose the port Nginx is listening on
EXPOSE 8080

# Environment variables
ENV NODE_ENV=production
ENV API_PORT=3000

# Start both services
ENTRYPOINT ["./entrypoint.sh"]
