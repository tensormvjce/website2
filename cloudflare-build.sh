#!/bin/bash
set -e

# Print environment information
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"
echo "Current directory: $(pwd)"
echo "Build environment:"
env | grep VITE_

# Install dependencies
npm ci

# Run type checking
npm run tsc

# Run build with verbose output
npm run build --verbose

# Check build output
if [ ! -d "dist" ]; then
    echo "Error: Build did not generate 'dist' directory"
    exit 1
fi

# List build output
ls -la dist
