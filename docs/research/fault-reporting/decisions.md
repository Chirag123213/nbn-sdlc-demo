# Decisions

**Owner:** Zafir Hasan

I record decisions by date. Status descriptions refer to the checkpoint shown; my later clarifications do not backdate approvals.

| Date       | Decision                                                                                  | Rationale / status                                                                                                |
| ---------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 2026-09-22 | I chose main at c2461d276426f2372ae09a65aae59a8fbd5e955b as the source baseline.          | Includes merged secret scanning and AI declaration; preserves the older metrics branch.                           |
| 2026-09-22 | I chose to prepare the setup before Copilot entitlement and defer feature implementation. | I requested steps 1, 2, 3, 5, 6 and preparation for 7.                                                            |
| 2026-09-22 | I chose to block recognised remote git pushes in the sample preToolUse hook.              | Includes implicit destinations; human controls pushes. This lexical guard is not comprehensive shell enforcement. |
| 2026-09-22 | I kept missing historical measurements explicit.                                          | No inferred human review minutes, AI credits or human-only provenance.                                            |

At the setup checkpoint, I still needed detailed feature approval, a reviewer assignment and capacity confirmation. I record later changes with their date, decision maker, affected criteria and reason.

| 2026-09-27 | I approved AC1–AC6, exclusions, frontend Server Action/Firebase Admin architecture, `faultReports`/`uid`, document-ID reference, newest-first listing, strict unknown-field rejection, server-only access, and user-safe missing/non-owned ID handling. | Readiness preparation is authorized; feature implementation remains blocked. I initially supplied the approval time as `9:43` without a date or timezone. Independent reviewer: Chirag Wadehra. Capacity remains pending. |

| 2026-09-27 | I supplied hosted issue `https://github.com/Chirag123213/nbn-sdlc-demo/issues/57`, approval time `27 Sep 9:43pm Melbourne`, retained Chirag Wadehra as independent reviewer, authorized synthetic account creation and report-record cleanup after review, and required User A/User B labels without credentials. | Issue is open and verified. Local Firebase configuration is still absent, so account creation and remote checks were not attempted. Capacity remains pending. |

| 2026-09-30 | I approved descriptive frontend mutation reporting with no percentage threshold, required isolated detection of ownership and blank-description seeded faults, accepted the no-pre-feature-baseline methodology exception, and authorized issue #57 implementation. | Added only the approved frontend Stryker dependencies/configuration and feature files. Firebase integration remains blocked by worktree-local environment visibility; User A/User B remain uncreated pending human sign-up. My capacity estimate was approximately 2 hours, with 1 hour for Chirag; actual measured time remains separate. |

## Chapter clarifications

| Recorded    | Clarification                                                                                                                                                                                           | Limit / evidence                                                                                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 23 Oct 2026 | I used GitHub Copilot Desktop App with GPT 5.6 Luna, approved dependency commit `2c19c5d`, and reviewed F1 to F18 with the F1 model correction. No AC2 correction or retest existed at that checkpoint. | Exact client version and original dependency-approval timestamp were not supplied.                                                                                                      |
| 28 Oct 2026 | I record the live AC2 failure as not reproduced. I recommend a visible limit notification, such as a pop-up, alongside preserving text after validation errors.                                         | [Live results](evidence/ac2-verification-2026-10-28/live-results.json); the notification is proposed, not implemented. This follow-up is separate from Chirag's independent acceptance. |
