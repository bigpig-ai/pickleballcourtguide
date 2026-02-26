#!/bin/bash
# Blog Publisher - creates a new blog post, commits, deploys, and indexes
# Usage: ./scripts/publish-blog.sh <slug> <title>
# Example: ./scripts/publish-blog.sh "indoor-pickleball-courts-guide" "Indoor Pickleball Courts: Complete Guide"
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SLUG="${1:?Usage: publish-blog.sh <slug> <title>}"
TITLE="${2:?Usage: publish-blog.sh <slug> <title>}"
SITE="https://pickleballcourtguide.com"

cd "$PROJECT_DIR"

BLOG_DIR="src/app/blog/$SLUG"
if [[ -d "$BLOG_DIR" ]]; then
  echo "Blog post already exists at $BLOG_DIR"
else
  echo "Blog directory $BLOG_DIR not found. Create the page.tsx first."
  exit 1
fi

# Commit
git add -A
git commit -m "Add blog: $TITLE" || echo "Nothing to commit"
git push origin main

# Deploy
echo "==> Deploying..."
bash "$SCRIPT_DIR/deploy.sh" --skip-index

# Index just this URL
echo "==> Submitting to IndexNow..."
bash "$SCRIPT_DIR/indexnow-submit.sh" "$SITE/blog/$SLUG"

echo "==> Published: $SITE/blog/$SLUG"
