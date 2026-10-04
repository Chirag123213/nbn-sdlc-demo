# FR-01 Firebase integration results

## Environment

- Worktree: `/Users/zafirhasan/Uni/ProgrammingProject/copilot-worktrees/nbn-sdlc-demo/s4084016-shiny-broccoli`
- Firebase project: `nbn-sdlc-demo`
- Local app: `http://localhost:3000`
- Tested revision: current local revision after focused test revision; no application push/merge/deploy
- Root `.env` and `.env.fr01-test.local` readable and Git-ignored; values were not displayed
- `pnpm run env:sync`: succeeded
- User A and User B: human-confirmed through the supplied message; private Admin lookup verified both exist and are email-verified. No exact creation timestamp is invented.

## Results

| Criterion | Result | Evidence/limitation |
|---|---|---|
| AC1 | Partial pass | User A submitted all three categories through the local app. References: `nA9RKDvyG1aAo4FNjIGP`, `hMuF0yWIusG8ohAFz9CN`, `UbB2OLV7vsjQad3e1217`. Admin verification found the expected categories, trimmed description lengths 45/47/45, server Timestamp values, `submitted` status, and owner matching User A. |
| AC2 | Local automated pass; live whitespace rejection pass | User A submitted a whitespace-only description through the app. The Server Action returned `String must contain at least 10 character(s)` and the report list remained unchanged; no invalid record was created. Other invalid categories and length boundaries remain covered by automated tests only. |
| AC3 | Partial pass | The persisted reports have document-ID references, owner matching User A, Timestamp `createdAt`, and `submitted` status. Forged owner/status rejection is covered by local strict-schema tests; the UI exposes no forged-field request path, so no live forged request was issued. |
| AC4 | Pass for local Firebase app checks; deployed-preview pending | After the human-created index reached `READY`, User A opened `/faults` and saw four synthetic reports newest-first: `UbB2OLV7vsjQad3e1217`, `hMuF0yWIusG8ohAFz9CN`, `nA9RKDvyG1aAo4FNjIGP`, `huGB9ZQcAVKJRFaqllrV`. A full navigation refresh returned the same order and references. |
| AC5 | Partial pass | User B opened `/faults` after switching accounts and saw `No fault reports yet`, establishing owner-filtered listing. Direct-ID Server Action checks and unauthenticated Server Action create/list/direct-read checks remain unperformed because the app exposes no direct-ID UI or live action-test harness. The unauthenticated protected-page check returned HTTP 307 to `/auth/signin`; local action tests and deployed client-rule 403 checks remain the evidence for the remaining paths. |
| AC6 | Automated pass; live limitation | Local forced-storage-failure tests verify safe error/no false success. No safe live fault-injection mechanism exists, so the live failure path remains unperformed. |
| Newest-first/index | Pass | Human created the approved index in Firebase Console for `nbn-sdlc-demo`; API verification on 2026-10-02 reported `READY`, collection scope, `uid ASCENDING`, `createdAt DESCENDING` (plus Firestore implicit `__name__ DESCENDING` tie-breaker). This matches the repository definition. User A real query and refresh passed newest-first. |
| Direct client access | Static/policy evidence only | `firebase/firestore.rules` explicitly denies `faultReports` reads/writes. No rules deployment or live client SDK denial test was claimed. |

## Approved Firestore deployment

- Target: `nbn-sdlc-demo` (confirmed by `.firebaserc` and deployment request).
- Payload inspection: local `firebase/firestore.indexes.json` contains only the approved `faultReports` composite index; local rules add only `match /faultReports/{reportId} { allow read, write: if false; }`.
- Deployed rules: succeeded through the Firestore Rules API after the Firebase CLI stopped before mutation on a `serviceusage.services.get` 403. Active ruleset: `f8d660ad-dba6-42e5-b140-1826ba927d9a`; release update time: `2026-09-30T07:10:15.187454Z`.
- Deployed indexes: the human later created the approved index in Firebase Console. API verification on 2026-10-02 reported it `READY`; definition matches the repository payload. No unrelated indexes were deleted or changed.
- The earlier service-account 403 and empty-index observation are historical; the index is now ready and the real list query passed.

## Direct client and unauthenticated rules checks

Using Firebase client REST requests against `nbn-sdlc-demo`, with credentials held only in the local test process and never recorded:

| Request | Result |
|---|---|
| Unauthenticated direct read of an existing synthetic report | HTTP 403 |
| Unauthenticated direct write probe | HTTP 403; no probe record created |
| User A direct read | HTTP 403 |
| User A direct write probe | HTTP 403; no probe record created |
| User B direct read of User A report | HTTP 403 |

These checks establish the deployed Firestore rules denial for direct client access. They do not establish Server Action list ordering or cross-owner behavior, which remain blocked by the missing composite index.

The initial exploratory report created while the signed-in User A session was
being identified was deleted after verification; it was not used as acceptance
evidence. No unrelated records were modified.

The browser session used for the User B attempt displayed the configured synthetic User B account. The `/faults` page showed `No fault reports yet` while User A had four reports, establishing owner-filtered listing. The app has no direct-ID UI; direct-ID Server Action and unauthenticated Server Action checks remain covered by local tests rather than live browser evidence.
