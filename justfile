_default:
	@just --list --unsorted

set positional-arguments

# run git pruning on merged branches to clean up local workspace (run with `nuclear` to clean up orphaned branches)
prune-my-branches nuclear='no':
  #!/usr/bin/env bash
  git branch --merged| egrep -v "(^\*|master|main|dev)" | xargs git branch -d
  git remote prune origin
  if [ "{{nuclear}}" == 'nuclear' ]; then
    echo Switching to main to remove orphans
    git switch main
    git branch -vv | grep ': gone]' | grep -v "\*" | awk '{ print $1; }' | xargs -r git branch -D
    git switch -
  fi
  echo "Remaining Git Branches:"
  git --no-pager branch

update-openapi VERSION:
  # Download openapi.json from the stage branch in the BloodHound repo for the given version and save it to docs/openapi.json
  curl -L --fail "https://raw.githubusercontent.com/SpecterOps/BloodHound/stage/{{VERSION}}/packages/go/openapi/doc/openapi.json" -o docs/openapi.json || (echo "Failed to download OpenAPI spec for version {{VERSION}}" && exit 1)

# Generate OpenGraph library data from the JSON source files
generate-opengraph-library:
  #!/usr/bin/env bash
  set -euo pipefail
  node scripts/generate-opengraph-library-data.mjs

# Refresh cached vendor favicons used by the OpenGraph library
fetch-opengraph-library-favicons:
  #!/usr/bin/env bash
  set -euo pipefail
  node scripts/fetch-opengraph-vendor-favicons.mjs

# Validate OpenGraph library data and fail if generated data is stale
check-opengraph-library:
  #!/usr/bin/env bash
  set -euo pipefail
  node scripts/generate-opengraph-library-data.mjs --check

# Check docs coverage for edge help texts vs code registry
check-edges bh_root="../BloodHound":
  #!/usr/bin/env bash
  set -euo pipefail
  python3 scripts/check_edge_docs.py --bh-root "{{bh_root}}"
