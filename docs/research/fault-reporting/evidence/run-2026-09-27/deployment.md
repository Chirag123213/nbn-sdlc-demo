# FR-01 approved Firestore deployment

- Date: 2026-09-30 (local Melbourne session)
- Target: `nbn-sdlc-demo`
- Application deployment, authentication settings, production promotion, push, and merge were not performed.

## Payload inspection

The local payload was inspected before deployment. `firebase/firestore.indexes.json` contains one index only: collection `faultReports`, collection scope, `uid ASCENDING`, `createdAt DESCENDING`. `firebase/firestore.rules` adds one `faultReports` match denying reads and writes. The currently deployed ruleset was fetched before deployment and contained no `faultReports` match; the deployed index list was empty. No unrelated changes were present.

## Commands and results

The attempted CLI command was:

```text
pnpm dlx firebase-tools deploy --only firestore:rules,firestore:indexes --project nbn-sdlc-demo --non-interactive
```

The CLI stopped before mutation with HTTP 403 because the service account lacked `serviceusage.services.get` for `firestore.googleapis.com`. The approved rules were then deployed through the Firestore Rules API. Ruleset `f8d660ad-dba6-42e5-b140-1826ba927d9a` was activated as the `cloud.firestore` release at `2026-09-30T07:10:15.187454Z`.

The composite-index creation request was sent to the Firestore Index API for `nbn-sdlc-demo` and returned HTTP 403, `The caller does not have permission`. A subsequent index listing returned zero indexes. No index deletion or unrelated index change occurred.

## Current deployment status

- Rules: deployed and active; direct client denial checks returned HTTP 403 for unauthenticated, User A, and User B reads/writes.
- Index: human-created in Firebase Console on 2026-10-02; API verification reported `READY` with the repository-matching fields.
- The earlier service-account index-creation 403 is historical and no further IAM or rules changes were made.
