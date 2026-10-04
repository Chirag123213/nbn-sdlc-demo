# FR-01 feature issue draft

**Title:** Add authenticated fault reporting

## User story

As a signed-in user, I can submit a fault and retrieve my own reports so I have a durable reference for the problem.

## Acceptance criteria

- **AC1:** A signed-in user can submit category `no-service`, `intermittent` or `slow-speed` and a trimmed description of 10–1000 characters.
- **AC2:** Missing/unknown categories and descriptions outside those limits are rejected server-side without a write.
- **AC3:** The server stores a unique reference, authenticated owner, server timestamp and initial `submitted` status. Client-supplied owner/status cannot override them.
- **AC4:** A successful submission shows its reference; the user's report remains retrievable after refresh.
- **AC5:** Unauthenticated creation/read is rejected; a second user cannot read the first user's report, including direct-ID requests.
- **AC6:** A failed save displays a useful error and no false success confirmation.

## Approved implementation

- Use the existing frontend Server Action, Firebase Admin and verified session-cookie architecture.
- Do not change the Express backend.
- Store reports in the `faultReports` collection with `uid` as the owner field.
- Use the Firestore document ID as the user-visible reference.
- List the authenticated user's reports newest-first using a server-side query ordered by `createdAt` descending. Add an index only if the selected query requires one.
- Keep the existing unauthenticated redirect to `/auth/signin`. Do not swallow framework redirects in a generic storage-error handler.
- Reject unknown input fields, including forged `uid` and `status`, with strict server-side validation.
- Use server-only access to `faultReports`; deny direct client reads and writes in Firestore rules. Every Server Action must still authenticate and enforce ownership.
- Missing and non-owned report IDs return the same user-safe result without exposing report data.

## Scope

Proposed files:

- `frontend/src/features/faults/**`
- `frontend/src/app/(dashboard)/faults/**`
- `frontend/src/actions/faults.actions.ts`
- `frontend/src/lib/validations/faults.ts`
- `frontend/src/types/firestore.ts` (fault-reporting type only)
- `frontend/src/lib/firebase/firestore.ts` (fault-reporting helper only)
- `frontend/tests/**` (fault-reporting tests only)
- `frontend/src/components/layout/Sidebar.tsx` (fault-report navigation entry only)
- `firebase/firestore.rules` (faultReports rules only)
- `firebase/firestore.indexes.json` only if the selected query requires it
- `docs/FIRESTORE-SCHEMA.md` (faultReports schema only)
- FR-01 evidence files under `docs/research/fault-reporting/`

Excluded: attachments, notifications, technician dispatch, real customer data, NBN integrations, diagnosis, admin triage/status editing, unrelated refactoring and dependency upgrades.

## Dependencies and evidence

Dependencies are Firebase Auth/session-cookie verification, Firestore credentials and write access, configured preview/deployment access, and the approved synthetic test accounts. Use synthetic reports only; do not commit credentials or environment files.

Required checks are `pnpm run lint`, `pnpm run typecheck`, `pnpm run test:all`, `pnpm run build`, relevant security checks, targeted fault-report tests, and an approved mutation comparison. Record failures honestly.

## Human controls

- Approver/run operator: Zafir Hasan
- Approval time supplied: `9:43` (date/timezone not supplied)
- Independent reviewer: Chirag Wadehra
- Capacity allocation: Pending

Hosted issue: https://github.com/Chirag123213/nbn-sdlc-demo/issues/57

The issue is open and was verified from GitHub on 27 September 2026. The draft remains the local scope/evidence companion; it is not a second issue.
