#!/bin/bash
# PCG Deploy Script - builds, deploys to Vercel production, submits to IndexNow
# Usage: ./scripts/deploy.sh [--skip-index]
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
KEYS_FILE="$HOME/.openclaw/workspace/.keys"
SITE="https://pickleballcourtguide.com"
INDEXNOW_KEY="pickleballcourtguide2026"

cd "$PROJECT_DIR"
source "$KEYS_FILE"

echo "==> Deploying to Vercel production..."
npx vercel --prod --token "$VERCEL_TOKEN" --yes 2>&1 | tail -5

echo "==> Deploy complete."

if [[ "${1:-}" != "--skip-index" ]]; then
  echo "==> Submitting all URLs to IndexNow..."
  bash "$SCRIPT_DIR/indexnow-submit.sh"
fi

echo "==> Done. Site live at $SITE"
