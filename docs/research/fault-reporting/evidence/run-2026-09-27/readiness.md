# FR-01 readiness record — 2026-09-27

## Approved readiness inputs

- Approver/run operator: Zafir Hasan
- Approval timestamp: 27 Sep 9:43pm Melbourne
- Independent reviewer: Chirag Wadehra
- Hosted issue: https://github.com/Chirag123213/nbn-sdlc-demo/issues/57 (open; verified)
- Capacity estimates subsequently recorded in `pr-evidence.md`: Zafir approximately 2 hours; Chirag 1 hour. These are not measured durations.
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

Hosted issue and approval date/timezone are recorded. Capacity estimates are distinct from actual time measurements.

## Actual starting commits

- Source baseline commit: `c2461d276426f2372ae09a65aae59a8fbd5e955b`
- Setup freeze/current starting commit: `b62e009b6e8bc51779744a6f67d1e0c92cf3003e`
- Current planning branch: `s4084016-fr-01-fault-reporting-plan`
- Working tree at readiness inspection: clean before these readiness edits

The source baseline and setup freeze are historical/current commit identifiers, not claims that the feature is implemented.

## Environment history and current recorded status

Initial readiness checks found configuration missing in the separate worktree;
see `env-sync.txt` and [consolidated checks](routine-checks.md). Configuration was
subsequently supplied and env:sync succeeded. User A/B creation and verification
were human-confirmed; local Firebase checks followed. See [account record](account-creation.md)
and [integration results](integration-results.md). No credentials are recorded here.
Preview acceptance remains pending in the available evidence.

## Measurement record

The first planning exchange is included in FR-01 Stage 5. No initial readings were supplied for:

- instruction time
- generation elapsed time
- active human review time
- manual correction time
- check execution time
- AI Credits before/after or delta

Record each stage with separate start/end timestamps and actual readings. Do not infer credits from prompt count or elapsed wall-clock time. Human review is active review time; check execution is command/runtime time.

Actual per-stage readings are maintained in `../../credit-log.md`; the initial planning readings remain unavailable. Do not use capacity or command runtimes as substitutes.
