# Decisions

| Date       | Decision                                                                          | Rationale / status                                                                                                |
| ---------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 2026-09-22 | Use current main c2461d276426f2372ae09a65aae59a8fbd5e955b as the source baseline. | Includes merged secret scanning and AI declaration; preserves the older metrics branch.                           |
| 2026-09-22 | Prepare setup before Copilot entitlement, defer feature implementation.           | User requested steps 1, 2, 3, 5, 6 and preparation for 7.                                                         |
| 2026-09-22 | Block recognised remote git pushes in the sample preToolUse hook.                 | Includes implicit destinations; human controls pushes. This lexical guard is not comprehensive shell enforcement. |
| 2026-09-22 | Keep missing historical measurements explicit.                                    | No inferred human review minutes, AI credits or human-only provenance.                                            |

Detailed feature approval, reviewer assignment and capacity confirmation remain pending. Add changes with timestamp, decision maker, affected criteria and reason.

| 2026-09-27 | Zafir Hasan approved AC1–AC6, exclusions, frontend Server Action/Firebase Admin architecture, `faultReports`/`uid`, document-ID reference, newest-first listing, strict unknown-field rejection, server-only access, and user-safe missing/non-owned ID handling. | Readiness preparation is authorized; feature implementation remains blocked. Approval time supplied as `9:43` without date/timezone. Independent reviewer: Chirag Wadehra. Capacity remains pending. |

| 2026-09-27 | Zafir Hasan supplied hosted issue `https://github.com/Chirag123213/nbn-sdlc-demo/issues/57`, approval time `27 Sep 9:43pm Melbourne`, retained Chirag Wadehra as independent reviewer, authorized synthetic account creation and report-record cleanup after review, and required User A/User B labels without credentials. | Issue is open and verified. Local Firebase configuration is still absent, so account creation and remote checks were not attempted. Capacity remains pending. |

| 2026-09-30 | Zafir Hasan approved descriptive frontend mutation reporting with no percentage threshold, required isolated detection of ownership and blank-description seeded faults, accepted the no-pre-feature-baseline methodology exception, and authorized issue #57 implementation. | Added only the approved frontend Stryker dependencies/configuration and feature files. Firebase integration remains blocked by worktree-local environment visibility; User A/User B remain uncreated pending human sign-up. Capacity estimates: Zafir ~2 hours, Chirag 1 hour; actual measured time remains separate. |
