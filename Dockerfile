# Step 1: Use an official Node.js image to build the frontend
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies (fix for peer dependencies)
RUN npm install --legacy-peer-deps

# Copy the entire frontend project
COPY . .

# Build the React app
RUN npm run build

# Step 2: Use Apache HTTPD to serve the built React app
FROM httpd:alpine

# Copy the built React app from the build stage to the Apache server's root directory
COPY --from=build /app/build/ /usr/local/apache2/htdocs/

# Expose port 80 (default for HTTP)
EXPOSE 80