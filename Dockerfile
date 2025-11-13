# Use official Node.js image
FROM node:20-alpine

# Set working directory to client folder
WORKDIR /app/client

# Copy package files from client folder
COPY client/package*.json ./
COPY client/tsconfig.json ./
RUN npm ci

# Copy client project files
COPY client/ .

# Build the app (this will compile TypeScript)
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]