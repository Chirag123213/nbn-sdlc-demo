# Fault-reporting proof of concept

Prepared 22 September 2026. Run family: FR-01. Owner: Zafir Hasan (implementation/run operator). Priority: P1 for the experiment. Reviewer role: independent teammate; named reviewer pending. Status: proposed acceptance criteria, ready for human review; no feature implementation authorised by this brief alone.

## Selection and representativeness

Fault reporting is selected because one small user journey exercises development, testing and deployment: authenticated input, validation, durable storage, ownership boundaries, negative tests, review, and a demonstrable deployed result. These are representative delivery concerns rather than a choice made solely for convenience. Stage 5 planning prepares the experiment; stages 6–8 are the three execution stages. This is a synthetic student demonstration, not an operational NBN system.

## User story and acceptance criteria

As a signed-in user, I can submit a fault and retrieve my own reports so I have a durable reference for the problem.

| ID  | Acceptance criterion                                                                                                                                           | Required evidence                                                                               |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| AC1 | A signed-in user can submit category `no-service`, `intermittent` or `slow-speed` and a trimmed description of 10–1000 characters.                             | Valid submission test and deployed smoke test.                                                  |
| AC2 | Missing/unknown categories and descriptions outside those limits are rejected server-side without a write.                                                     | Boundary tests at 9, 10, 1000 and 1001 characters; blank/whitespace and invalid-category cases. |
| AC3 | The server stores a unique reference, authenticated owner, server timestamp and initial `submitted` status. Client-supplied owner/status cannot override them. | Persistence and forged-owner/status tests.                                                      |
| AC4 | A successful submission shows its reference; the user's report remains retrievable after refresh.                                                              | Confirmation test and persistence smoke test.                                                   |
| AC5 | Unauthenticated creation/read is rejected; a second user cannot read the first user's report, including direct-ID requests.                                    | Unauthenticated and cross-user negative tests.                                                  |
| AC6 | A failed save displays a useful error and no false success confirmation.                                                                                       | Forced storage-failure test.                                                                    |

## Proposed scope

One vertical feature PR; split only if the approved plan identifies independently reviewable slices. Reuse the current server-action/auth architecture where appropriate; choose the final route and exact files in the approved implementation plan.

- `frontend/src/features/faults/**`
- `frontend/src/app/(dashboard)/faults/**`
- `frontend/src/actions/faults.actions.ts`
- `frontend/tests/**` for fault-related cases only
- `frontend/src/components/layout/**` only for a fault-report navigation entry
- `firebase/firestore.rules` and `firebase/firestore.indexes.json` only if the selected storage path requires changes
- `docs/FIRESTORE-SCHEMA.md` and this experiment's evidence

Backend API changes are not assumed: if the implementation plan chooses Express instead, record a scope decision and approve the specific backend paths before edits. Dependencies: existing authentication, configured development Firebase credentials, reachable environment, frozen baseline, Copilot entitlement and human plan approval.

Excluded: attachments, notifications, technician dispatch, real customer data, NBN integrations, diagnosis, admin triage/status editing, unrelated refactoring and dependency upgrades.

## Approval record

Feature choice: requested by Zafir. Detailed criteria/scope: pending named human approval and timestamp. Capacity: pending operator/reviewer time allocation. Record any post-approval rescope in `decisions.md` before implementing it. This draft was prepared with AI assistance and must not be counted as wholly human-written Stage 5.3 work.
