# FR-01 readiness record — 2026-09-27

## Approved readiness inputs

- Approver/run operator: Zafir Hasan
- Approval timestamp: 27 Sep 9:43pm Melbourne
- Independent reviewer: Chirag Wadehra
- Hosted issue: https://github.com/Chirag123213/nbn-sdlc-demo/issues/57 (open; verified)
- Capacity allocation: Pending
- AC1–AC6 and feature exclusions: approved
- Architecture: frontend Server Actions with Firebase Admin and verified session cookie
- Backend: no Express changes
- Collection: `faultReports`
- Owner field: `uid`
- User-visible reference: Firestore document ID
- List order: `createdAt` descending, newest first
- Unauthenticated behavior: retain redirect to `/auth/signin`
- Unknown fields, including forged owner/status: reject
- Access: server-only; explicit client read/write denial in Firestore rules
- Missing and non-owned IDs: same user-safe result without report disclosure

Capacity remains pending. Hosted issue and exact approval date/timezone are now recorded.

## Actual starting commits

- Source baseline commit: `c2461d276426f2372ae09a65aae59a8fbd5e955b`
- Setup freeze/current starting commit: `b62e009b6e8bc51779744a6f67d1e0c92cf3003e`
- Current planning branch: `s4084016-fr-01-fault-reporting-plan`
- Working tree at readiness inspection: clean before these readiness edits

The source baseline and setup freeze are historical/current commit identifiers, not claims that the feature is implemented.

## Local environment verification

Rechecked 2026-09-30 in the active worktree. The root `.env`, `.env.fr01-test.local`, `frontend/.env.local`, and `backend/.env` are readable and Git-ignored. Their contents were not displayed. `env:sync` may now be run; User A and User B remain not created until human sign-up confirmation.

Observed without reading or exposing secret values:

- `.env`: absent
- `frontend/.env.local`: absent
- `backend/.env`: absent
- Configuration status: still pending based on the filesystem recheck
- No Firebase sign-in, report write, or remote test record was attempted.
- No credentials or environment files were created.

Required human setup before Firebase checks:

1. Create or provide the local root `.env` from `.env.example`, keeping credentials local and uncommitted.
2. Run `pnpm run env:sync` to generate ignored package env files.
3. Confirm Firebase Auth access and a permitted synthetic test account.
4. Create two synthetic Firebase Auth accounts through the existing sign-up flow where possible; record only User A/User B.
5. Confirm a reachable preview/deployment environment before deployed smoke tests.
6. Account creation was authorized, but no accounts could be created until configuration is supplied; explicit report-record creation authorization remains in force.

The existing baseline's Firebase connectivity and preview observations remain historical until rechecked.

## Measurement record

The first planning exchange is included in FR-01 Stage 5. No initial readings were supplied for:

- instruction time
- generation elapsed time
- active human review time
- manual correction time
- check execution time
- AI Credits before/after or delta

Record each stage with separate start/end timestamps and actual readings. Do not infer credits from prompt count or elapsed wall-clock time. Human review is active review time; check execution is command/runtime time.

| Stage | Instruction time | Generation elapsed | Human review | Manual correction | Check execution | AI Credits | Evidence |
|---|---:|---:|---:|---:|---:|---|---|
| 5 planning/readiness | unavailable | unavailable | unavailable | unavailable | unavailable | unavailable | this run |
| 6 development | pending | pending | pending | pending | pending | pending | pending |
| 7 testing/review | pending | pending | pending | pending | pending | pending | pending |
| 8 deployment/learning | pending | pending | pending | pending | pending | pending | pending |
