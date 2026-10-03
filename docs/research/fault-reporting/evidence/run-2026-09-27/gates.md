# FR-01 acceptance gates

Implementation, focused automated tests and local-app/Firebase integration are
recorded as complete to the extent described in [ac-matrix.md](ac-matrix.md).
Issue #57, plan approval, server-only architecture, synthetic accounts and the
no-threshold mutation policy are recorded. Development rules are deployed and
the human-created index was verified READY. These are not application-preview
or final human acceptance.

Remaining gates in the available evidence:
- Chirag Wadehra reviews code/test correctness and records dispositions.
- Dependency advisories are remediated or explicitly dispositioned; see
  [tooling-and-security.md](tooling-and-security.md).
- Actual Gitleaks/required CI results are recorded; local unavailability is not a pass.
- Preview URL and deployed commit are recorded and preview smoke tests completed.
- Available AI usage/time readings and prompt provenance are consolidated; missing
  values stay unavailable, not zero or inferred.
- Final human acceptance and any release/promotion approval are recorded separately.

Live Server Action negative-path and storage-failure limitations remain explicit
in the AC matrix. Automated evidence requires human judgement. Historical records
of “no push/deployment” apply to their checkpoint and do not assert current remote
state; remote PR/CI state was not rechecked during this documentation cleanup.
