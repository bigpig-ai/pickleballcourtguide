#!/bin/bash
# Add a new city to the directory
# Usage: ./scripts/add-city.sh
# This is a wrapper - the actual city data lives in src/data/cities.ts
# After editing cities.ts, run this to deploy + index the new page
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "==> Committing city changes..."
git add -A
git commit -m "Add new city/cities" || echo "Nothing to commit"
git push origin main

echo "==> Deploying..."
bash "$SCRIPT_DIR/deploy.sh"

echo "==> New city pages deployed and indexed."
