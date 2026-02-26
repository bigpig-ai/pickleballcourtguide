#!/bin/bash
# Submit all sitemap URLs to IndexNow (Bing, Yandex, etc.)
# Usage: ./scripts/indexnow-submit.sh [specific-url]
set -euo pipefail

SITE="https://pickleballcourtguide.com"
INDEXNOW_KEY="pickleballcourtguide2026"

if [[ -n "${1:-}" ]]; then
  # Submit a single URL
  URLS="[\"$1\"]"
  echo "Submitting 1 URL to IndexNow..."
else
  # Fetch all URLs from sitemap
  URLS=$(curl -s "$SITE/sitemap.xml" | grep '<loc>' | sed 's/.*<loc>//;s/<\/loc>.*//' | python3 -c "
import sys, json
urls = [line.strip() for line in sys.stdin if line.strip()]
print(json.dumps(urls))
")
  COUNT=$(echo "$URLS" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))")
  echo "Submitting $COUNT URLs to IndexNow..."
fi

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"pickleballcourtguide.com\",
    \"key\": \"$INDEXNOW_KEY\",
    \"keyLocation\": \"$SITE/$INDEXNOW_KEY.txt\",
    \"urlList\": $URLS
  }")

if [[ "$HTTP_CODE" == "200" || "$HTTP_CODE" == "202" ]]; then
  echo "IndexNow accepted (HTTP $HTTP_CODE)"
else
  echo "IndexNow returned HTTP $HTTP_CODE - may need investigation"
fi
