# Use Node.js 20 Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Set environment variable for build phase
ENV IS_BUILD=true

# Build the application
RUN npm run build

# Remove build environment variable for runtime
ENV IS_BUILD=false

# Expose the application port
EXPOSE 3000

# Set the default command to start the application
CMD ["npm", "run", "dev"]
