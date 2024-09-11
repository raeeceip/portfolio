# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (if you have one)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of your code
COPY . .

# Build your application
RUN pnpm build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./

# If you have a server file, copy it as well
# COPY server.js ./

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]
