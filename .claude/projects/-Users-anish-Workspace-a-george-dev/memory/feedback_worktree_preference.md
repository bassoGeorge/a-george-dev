---
name: feedback-worktree-preference
description: User prefers to implement directly on the current branch without git worktrees
metadata:
  type: feedback
---

Skip worktree setup and implement directly on the current branch.

**Why:** User explicitly rejected worktree creation, preferring to work in place.

**How to apply:** When the using-git-worktrees skill triggers, skip worktree creation and proceed with implementation on the current branch.
