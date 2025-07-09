_default:
	@just --list --unsorted

set positional-arguments

# run git pruning on merged branches to clean up local workspace (run with `nuclear` to clean up orphaned branches)
prune-my-branches nuclear='no':
  #!/usr/bin/env bash
  git branch --merged | grep -E -v "(^\*|master|main|dev)" | xargs -r git branch -d
  git reflog expire --expire=now --all && git gc --prune=now --aggressive
  git remote prune origin
  if [ "{{nuclear}}" == 'nuclear' ]; then
    echo Switching to main to remove orphans
    git switch main
    git branch -vv | grep ': gone]' | grep -v "\*" | awk '{ print $1; }' | xargs -r git branch -D
    git switch -
  fi
  echo "Remaining Git Branches:"
  git --no-pager branch
