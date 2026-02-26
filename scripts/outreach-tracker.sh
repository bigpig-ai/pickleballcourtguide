#!/bin/bash
# Outreach Tracker - manages backlink outreach status
# Usage: 
#   ./outreach-tracker.sh list                    - show all outreach
#   ./outreach-tracker.sh add <org> <url> <email>  - add new target
#   ./outreach-tracker.sh update <org> <status>    - update status (sent/replied/linked/rejected)
#   ./outreach-tracker.sh due                      - show follow-ups due
set -euo pipefail

TRACKER="/Users/bigpig/.openclaw/workspace/projects/pickleball-court-guide/traffic/outreach-log.jsonl"
touch "$TRACKER"

ACTION="${1:-list}"

case "$ACTION" in
  add)
    ORG="${2:?Usage: add <org> <url> <email>}"
    URL="${3:?}"
    EMAIL="${4:?}"
    echo "{\"org\":\"$ORG\",\"url\":\"$URL\",\"email\":\"$EMAIL\",\"status\":\"pending\",\"added\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",\"last_contact\":null,\"follow_up_date\":null}" >> "$TRACKER"
    echo "Added: $ORG"
    ;;
  update)
    ORG="${2:?Usage: update <org> <status>}"
    STATUS="${3:?}"
    python3 -c "
import json, sys
lines = open('$TRACKER').readlines()
updated = False
out = []
for line in lines:
    d = json.loads(line.strip())
    if d['org'] == '$ORG':
        d['status'] = '$STATUS'
        d['last_contact'] = '$(date -u +%Y-%m-%dT%H:%M:%SZ)'
        if '$STATUS' == 'sent':
            from datetime import datetime, timedelta
            fu = (datetime.utcnow() + timedelta(days=7)).strftime('%Y-%m-%d')
            d['follow_up_date'] = fu
        updated = True
    out.append(json.dumps(d))
if not updated:
    print(f'Org \"$ORG\" not found')
    sys.exit(1)
with open('$TRACKER', 'w') as f:
    f.write('\n'.join(out) + '\n')
print(f'Updated: $ORG -> $STATUS')
"
    ;;
  due)
    echo "=== Follow-ups Due ==="
    python3 -c "
import json
from datetime import datetime
lines = open('$TRACKER').readlines()
today = datetime.utcnow().strftime('%Y-%m-%d')
for line in lines:
    d = json.loads(line.strip())
    fu = d.get('follow_up_date')
    if fu and fu <= today and d['status'] == 'sent':
        print(f\"  {d['org']} - sent to {d['email']} - follow up due {fu}\")
"
    ;;
  list)
    echo "=== Outreach Tracker ==="
    python3 -c "
import json
lines = open('$TRACKER').readlines()
if not lines:
    print('  (empty)')
else:
    for line in lines:
        d = json.loads(line.strip())
        print(f\"  [{d['status']:>8}] {d['org']} - {d.get('email','?')} - added {d['added'][:10]}\")
    counts = {}
    for line in lines:
        s = json.loads(line.strip())['status']
        counts[s] = counts.get(s, 0) + 1
    print(f\"\n  Total: {len(lines)} | \" + ' | '.join(f'{k}: {v}' for k,v in counts.items()))
"
    ;;
  *)
    echo "Unknown action: $ACTION"
    echo "Usage: outreach-tracker.sh [list|add|update|due]"
    exit 1
    ;;
esac
