#!/bin/bash
. ./.env-bash # Load .env-bash variables.
set -x
curl localhost:3000/api/users \
 -H "Content-Type: application/json" \
 -X PUT \
 -d '{"debug": true}' -s | json_pp
