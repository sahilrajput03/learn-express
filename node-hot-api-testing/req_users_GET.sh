#!/bin/bash
. ./.env-bash # Load .env-bash variables.

set -x
curl -X GET localhost:3000/api/users -s | json_pp
