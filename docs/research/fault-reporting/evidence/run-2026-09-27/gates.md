# FR-01 remaining gates

## Before implementation

- Publish the approved GitHub issue and record its URL in `issue-draft.md`.
- Supply exact approval date/timezone for the recorded `9:43` time.
- Confirm capacity allocation.
- Supply local Firebase configuration through the ignored root `.env`; run `pnpm run env:sync`.
- Confirm synthetic test account access and explicitly authorize creation of remote synthetic records.
- Approve the frontend mutation comparison basis and numeric threshold, if any.
- Decide whether a raw transcript export is required for the verbatim planning exchange artifact.
- Keep implementation within the approved file scope; record any rescope before editing.

## Before testing or deployed smoke tests

- Complete the approved feature implementation and targeted tests.
- Verify Firebase Auth and Firestore access with synthetic data only.
- Confirm a second synthetic account for cross-owner tests.
- Determine whether the `where('uid', '==', session.uid).orderBy('createdAt', 'desc')` query requires a Firestore composite index in the target project; add only the required index.
- Run and record lint, typecheck, all tests, build, security checks, and the approved mutation procedure.
- Obtain a reachable preview/deployment URL and record the deployed commit SHA.
- Obtain explicit confirmation before creating any remote test records.

## Before merge or release

- Chirag Wadehra completes the independent review and records dispositions.
- Human judges test correctness and mutation evidence; no automated result substitutes for that decision.
- CI is green or every failure is honestly recorded and dispositioned.
- Complete the AI-use declaration with the exposed client/model value or `not disclosed`, session reference, human edits, and stage measurements.
- Record release approval separately; do not infer it from deployment availability or repository ruleset configuration.
- Record smoke-test evidence and feed approved findings back into repository context.

## Current status after local Firebase integration

- Approved implementation and focused tests completed locally.
- Human-created `faultReports` composite index in `nbn-sdlc-demo` verified `READY` and matched to `firebase/firestore.indexes.json`.
- Approved `faultReports` deny rules are deployed and direct client denial evidence is recorded.
- User A local-app Firebase listing, refresh persistence, newest-first ordering, and live whitespace rejection passed.
- User B local-app owner-filtered listing passed; no reports were shown.
- Deployed-preview acceptance remains pending because no application preview URL/commit SHA has been recorded.
- Chirag Wadehra human review, dependency disposition, Gitleaks, and final human acceptance remain pending.
- No push, merge, application deployment, production promotion, or further rules/IAM change was performed.
