# Environment and routine check records

Historical command outputs, consolidated on 2026-10-02. Missing configuration and unavailable Gitleaks describe the recorded checkpoints, not current file availability. Account and integration status is in [integration-results.md](integration-results.md).

## environment-recheck.txt

```text
FR-01 environment recheck — 2026-09-27

Observed without reading secret values:
- Node: v24.19.0
- pnpm: 11.20.0
- root .env: absent
- frontend/.env.local: absent
- backend/.env: absent
- Firebase sign-in: not attempted
- Firebase Auth account creation: blocked by missing local configuration
- Remote Firestore writes: none
- Existing users/data: not inspected or modified

The supplied configuration status was not selectable as a concrete value; the
filesystem result is recorded as still pending.

local_url=http://localhost:3000/auth/signin
protected_faults_route_status=307 (redirects unauthenticated)
```

## env-sync-final.txt

```text
$ node scripts/sync-env.js
env:sync  .env → frontend/.env.local, backend/.env

env-sync-exit=0
```

## gitleaks-final.txt

```text
gitleaks unavailable
```

## validate-readiness.txt

```text
$ node scripts/validate-placeholders.js
✅ No unreplaced placeholders found.

environment-validation-exit=0
```

## validate-final.txt

Identical output to `validate-readiness.txt` above; the original contained no timestamp identifying a distinct execution.

