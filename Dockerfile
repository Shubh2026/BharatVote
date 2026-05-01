# Stage 1: Build the React application
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies using clean install
COPY package*.json ./
RUN npm ci

# Copy the rest of the application files
COPY . .

# Pass the API key as a build argument (Vite embeds this at build time)
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# Build the Vite application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration to listen on port 8080 and handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the previous stage to the Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 as expected by Google Cloud Run
EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
