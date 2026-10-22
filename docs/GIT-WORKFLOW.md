# Git Workflow

A single `main` branch — no `develop`, no release branches. Simple enough for a capstone team:
branch, build, PR, merge.

## Branch Structure

```
main         ← production (protected, deploys automatically on push)
  ↑
feature/*    ← new features (branched from main, PR back to main)
hotfix/*     ← urgent fixes (branched from main, PR back to main)
```

## Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/{kebab-case}` | `feature/notes` |
| Hotfix | `hotfix/{kebab-case}` | `hotfix/auth-token-expiry` |

## Workflow

```
git checkout main && git pull
git checkout -b feature/{name}
# ...make changes, commit...
git push -u origin feature/{name}
gh pr create --base main
# review, merge, GitHub deletes the branch automatically
```

`/git-feature` and `/git-hotfix` (Claude Code skills) automate exactly this. There's no
functional difference between the two branch types — `hotfix/*` is just a naming convention to
flag "this is an urgent fix" to reviewers.

## Commit Messages (Conventional Commits)

The `commit-msg` hook enforces this format:

```
type(scope): description

Examples:
feat: add notes feature
fix(auth): handle token expiry on refresh
docs: update Firestore schema for notes
refactor(backend): extract auth middleware
test: add integration tests for health route
chore: upgrade firebase-admin to v13
```

**Types:** `feat` · `fix` · `docs` · `style` · `refactor` · `test` · `chore` · `build` · `ci` · `perf` · `revert`

## Merge Strategy

Squash merge every PR into `main` — keeps history linear and each merge maps to one logical
change.

## Protected Branch

The `main` branch is protected by an active GitHub ruleset. Direct pushes, force pushes and deletion of `main` are restricted. All changes must go through a pull request.

### Required CI checks

The ruleset requires all five GitHub Actions checks defined in `.github/workflows/ci.yml` to pass before a pull request can be merged:

| Required check | Purpose |
| --- | --- |
| AI Declaration | Confirms that exactly one AI-use declaration option was selected in the pull request. |
| Lint & Typecheck | Runs placeholder validation, linting and TypeScript checks. |
| Frontend Tests | Runs frontend unit/component tests. |
| Backend Unit Tests | Runs backend unit tests. |
| Security Scan | Runs Gitleaks secret scanning and dependency vulnerability auditing. |

**Gate and holder: CI check (required).** A failed or incomplete required check blocks merging into `main`. These checks are enforced through the GitHub ruleset, independently of whether the changes were written by a human or an AI assistant.

### Pull request approval and merging

The active `main` ruleset also requires:

- **Two approving reviews** before merging.
- **Squash merging only**, keeping the history of `main` linear.
- **Protection against force pushes and branch deletion**.

**Gate and holder: Platform rule and Human.** GitHub enforces the approval count and permitted merge method. Human reviewers remain responsible for assessing whether the changes satisfy the requirements, have adequate tests and are appropriate to release.

Passing CI checks does not replace human review. A pull request is eligible for merging only when its required checks have passed and the necessary approvals have been recorded.

Merging into `main` triggers the normal production deployment process, so reviewers should treat approval and merging as a release decision.

## Tagging a milestone (optional)

If you want to mark a submission or checkpoint, tag `main` directly — no release branch needed:

```bash
git checkout main && git pull origin main
git tag v0.1.0 -m "Milestone: <what this is>"
git push origin v0.1.0
```
