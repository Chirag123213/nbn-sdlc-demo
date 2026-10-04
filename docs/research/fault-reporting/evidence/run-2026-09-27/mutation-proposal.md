# FR-01 frontend mutation proposal

## Scope

The existing backend mutation score is not comparable to the proposed frontend feature. The current frontend unit suite contains one utility test and has no feature-level tests, so it cannot provide a meaningful fault-reporting baseline. Do not compare the backend score with a future frontend score.

After the approved frontend tests exist, measure only the feature-relevant frontend source and its tests. The proposed mutation scope is:

- `frontend/src/actions/faults.actions.ts`
- `frontend/src/lib/validations/faults.ts`
- `frontend/src/features/faults/**/*.ts`
- `frontend/src/features/faults/**/*.tsx`

Exclude route/page wrappers, generated files, configuration, Firebase client initialisation, and unrelated shared code unless a mutation is directly introduced by the approved fault-report change. If a shared validation, type, collection-helper, or layout file is changed, do not mutate unrelated pre-existing logic in that file.

## Proposed tooling/configuration

Add frontend-local Stryker configuration only after this proposal and its comparison policy are approved. It should use the existing frontend Vitest configuration and runner, write reports under the FR-01 evidence directory or an ignored report directory, and preserve raw mutant statuses, timeouts, survivors, uncovered mutants and errors. Do not copy the backend thresholds or configuration because the scopes and test suites differ.

## Baseline procedure

1. Freeze the approved feature-test scope and record the exact commit.
2. Run the normal frontend unit suite and targeted feature tests.
3. Run the frontend mutation command with no feature implementation defects intentionally left in place.
4. Retain the raw report and command output, including timeout/error details.
5. Have the human reviewer judge whether the tests are correct and whether the mutant set represents the security and acceptance controls.
6. Repeat on the feature head using the same scope and tool version, or record why an exact comparison is impossible.

## Threshold policy awaiting approval

No numeric threshold is proposed or implied. The human must approve whether comparison is based on detected-mutant percentage, required kill evidence for specific seeded faults, or both, and must set any floor before the feature run. The existing suite has mixed/unverified authorship; no human-only provenance is claimed.
