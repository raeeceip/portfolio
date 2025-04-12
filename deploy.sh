#!/bin/bash

# Chiso's Cookbook Deployment Script for Cloudflare Pages
# This script helps deploy your notebook-style portfolio with optimized animations

echo "🍳 Starting deployment for Chiso's Cookbook..."

# Step 1: Ensure we have the latest dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Build the project
echo "🔨 Building the project..."
npm run build

# Step 3: Optimize images for faster loading
echo "🖼️ Optimizing images..."
find ./dist/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -exec sh -c 'echo "Optimizing $1..." && npx sharp-cli --input "$1" --output "$1" --quality 80' sh {} \; 2>/dev/null || echo "⚠️ Image optimization skipped (sharp-cli not installed, run 'npm install -g sharp-cli' to enable)"

# Step 4: Copy deployment config files to dist
echo "📋 Copying deployment configuration..."
cp public/_headers dist/_headers
cp public/_redirects dist/_redirects
cp public/service-worker.js dist/service-worker.js

# Step 5: Create a deployment with Cloudflare (Direct Upload Method)
# Note: This requires Cloudflare Wrangler to be authenticated
if command -v wrangler &> /dev/null; then
    echo "🚀 Deploying to Cloudflare Pages..."
    echo "Note: If this is your first deployment, you'll need to run: wrangler pages project create portfolio"
    echo "Starting deployment..."
    wrangler pages deploy dist --project-name=portfolio
else
    echo "⚠️ Wrangler not found or not authenticated. Please deploy manually:"
    echo "1. Go to https://dash.cloudflare.com/pages"
    echo "2. Connect your Git repository or upload the dist folder manually"
    echo "3. Set the build command to 'npm run build' and the build directory to 'dist'"
fi

echo "✅ Deployment package prepared successfully!"
echo "👨‍🍳 Your cookbook is ready to be served!"
