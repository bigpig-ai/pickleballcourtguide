#!/bin/bash
# SEO Health Check - verifies critical SEO elements are working
# Run weekly or after deploys
set -euo pipefail

SITE="https://pickleballcourtguide.com"
REPORT_FILE="/Users/bigpig/.openclaw/workspace/projects/pickleball-court-guide/traffic/seo-report-$(date +%Y-%m-%d).md"
ERRORS=0

echo "# SEO Health Check - $(date '+%Y-%m-%d %H:%M PT')" > "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 1. Check GA4
echo -n "GA4 tracking... "
GA4=$(curl -s "$SITE" | grep -c "G-P0HB65STRX" || true)
if [[ "$GA4" -gt 0 ]]; then
  echo "✅ Active"
  echo "- ✅ GA4 (G-P0HB65STRX) active" >> "$REPORT_FILE"
else
  echo "❌ Missing"
  echo "- ❌ GA4 NOT rendering in HTML" >> "$REPORT_FILE"
  ERRORS=$((ERRORS+1))
fi

# 2. Check sitemap
echo -n "Sitemap... "
SITEMAP_COUNT=$(curl -s "$SITE/sitemap.xml" | grep -c '<loc>' || true)
echo "$SITEMAP_COUNT URLs"
echo "- ✅ Sitemap: $SITEMAP_COUNT URLs" >> "$REPORT_FILE"

# 3. Check robots.txt
echo -n "robots.txt... "
ROBOTS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE/robots.txt")
if [[ "$ROBOTS" == "200" ]]; then
  echo "✅"
  echo "- ✅ robots.txt accessible" >> "$REPORT_FILE"
else
  echo "❌ HTTP $ROBOTS"
  echo "- ❌ robots.txt returned HTTP $ROBOTS" >> "$REPORT_FILE"
  ERRORS=$((ERRORS+1))
fi

# 4. Check key pages load
echo -n "Homepage... "
HOME_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE")
echo "HTTP $HOME_CODE"
echo "- Homepage: HTTP $HOME_CODE" >> "$REPORT_FILE"

echo -n "Naples FL page... "
NAPLES_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE/pickleball-courts/naples-fl")
echo "HTTP $NAPLES_CODE"
echo "- Naples FL: HTTP $NAPLES_CODE" >> "$REPORT_FILE"

echo -n "Blog index... "
BLOG_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE/blog")
echo "HTTP $BLOG_CODE"
echo "- Blog index: HTTP $BLOG_CODE" >> "$REPORT_FILE"

# 5. Check IndexNow key
echo -n "IndexNow key... "
INOW=$(curl -s -o /dev/null -w "%{http_code}" "$SITE/pickleballcourtguide2026.txt")
echo "HTTP $INOW"
echo "- IndexNow key file: HTTP $INOW" >> "$REPORT_FILE"

# 6. Check GSC verification tag
echo -n "GSC verification... "
GSC=$(curl -s "$SITE" | grep -c "google-site-verification" || true)
if [[ "$GSC" -gt 0 ]]; then
  echo "✅"
  echo "- ✅ GSC verification meta tag present" >> "$REPORT_FILE"
else
  echo "❌"
  echo "- ❌ GSC verification meta tag missing" >> "$REPORT_FILE"
  ERRORS=$((ERRORS+1))
fi

# 7. Page speed (basic - check response time)
echo -n "Response time... "
SPEED=$(curl -s -o /dev/null -w "%{time_total}" "$SITE")
echo "${SPEED}s"
echo "- Response time: ${SPEED}s" >> "$REPORT_FILE"

echo ""
echo "## Summary" >> "$REPORT_FILE"
echo "- Errors: $ERRORS" >> "$REPORT_FILE"
echo "- Checked: $(date '+%Y-%m-%d %H:%M PT')" >> "$REPORT_FILE"

if [[ "$ERRORS" -gt 0 ]]; then
  echo "⚠️  $ERRORS issue(s) found. Report: $REPORT_FILE"
else
  echo "✅ All checks passed. Report: $REPORT_FILE"
fi

cat "$REPORT_FILE"
