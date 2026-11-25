_default:
    @just --list --unsorted

set positional-arguments

# Run git pruning on merged branches to clean up local workspace (run with `nuclear` to clean up orphaned branches)
prune-my-branches nuclear='no':
    #!/usr/bin/env bash
    git branch --merged| egrep -v "(^\*|master|main|dev)" | xargs git branch -d
    git remote prune origin
    if [ "{{ nuclear }}" == 'nuclear' ]; then
      echo Switching to main to remove orphans
      git switch main
      git branch -vv | grep ': gone]' | grep -v "\*" | awk '{ print $1; }' | xargs -r git branch -D
      git switch -
    fi
    echo "Remaining Git Branches:"
    git --no-pager branch

# Download openapi.json from the stage branch in the BloodHound repo for the given version and save it to docs/openapi.json
update-openapi VERSION:
    curl -L --fail "https://raw.githubusercontent.com/SpecterOps/BloodHound/stage/{{ VERSION }}/packages/go/openapi/doc/openapi.json" -o docs/openapi.json || (echo "Failed to download OpenAPI spec for version {{ VERSION }}" && exit 1)

# Generate the docs Marketplace catalog and copy logos from local code repositories
sync-opengraph-marketplace bh_root="../BloodHound" bhe_root="../bloodhound-enterprise":
    #!/usr/bin/env bash
    set -euo pipefail
    node --experimental-strip-types scripts/sync-opengraph-marketplace.mjs --bh-root "{{ bh_root }}" --bhe-root "{{ bhe_root }}"

# Check docs coverage for documentable edges in the BloodHound CUE schema
check-edges bh_root="../BloodHound":
    #!/usr/bin/env bash
    set -euo pipefail
    python3 scripts/check_edge_docs.py --bh-root "{{ bh_root }}"

# Find images in docs/assets and docs/images no longer referenced anywhere in the repo
find-unused-images:
    #!/usr/bin/env bash
    set -euo pipefail
    python3 scripts/find_unused_images.py

# Delete images in docs/assets and docs/images no longer referenced anywhere in the repo
delete-unused-images:
    #!/usr/bin/env bash
    set -euo pipefail
    python3 scripts/find_unused_images.py --delete
