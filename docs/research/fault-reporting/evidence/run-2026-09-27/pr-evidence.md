# FR-01 PR evidence preparation

## Status

Implemented locally with automated and recorded local Firebase integration evidence.
Independent human review, security disposition and deployed-preview acceptance remain pending.
See `gates.md`; this is not full acceptance.

## Issue and session

- Hosted issue: https://github.com/Chirag123213/nbn-sdlc-demo/issues/57
- Copilot session reference: `8b0a3925-489a-4983-82d5-794b8316898e`
- Branch: `s4084016-fr-01-fault-reporting-plan`
- Source baseline: `c2461d276426f2372ae09a65aae59a8fbd5e955b`
- Setup freeze: `b62e009b6e8bc51779744a6f67d1e0c92cf3003e`
- Client/model: not disclosed by the interface
- Implementation author: current project session `8b0a3925-489a-4983-82d5-794b8316898e` / worktree folder `s4084016-shiny-broccoli`
- Earlier informed review: background agent `7fce3b71-5019-4aaf-859f-ab6cb1121084`; it was told the seeded-fault types, so blind discovery is unverified
- Fresh post-revision review: background agent `b0eda045-3399-4d51-990e-85a28b1bd439`; read-only, no prior report supplied, no seeded-fault exercise

## Prompt and attribution evidence

The initial planning prompt is preserved verbatim in `planning-prompt.txt` and
its response remains in the session transcript. The implementation authorization
and mutation-policy prompt are retained in the session history; no unavailable
response text is reconstructed. Human approval, issue, reviewer, and scope
records are in `decisions.md`.

## Time and usage readings

Retrospective operator estimates: approximately **4 hours generating time including
prompting**, and **35 minutes Zafir review time**. Supplied GitHub daily figures
sum to **69.05 AI Credits** and **$0.69 displayed amounts**; attribution to FR-01
alone is provisional. See [usage and time estimates](usage-and-time-estimates.md)
for the daily entries, definitions and limitations. Per-stage readings and
Chirag's actual review time remain unavailable. Capacity estimates and command
runtimes are not substitutes for these measurements.

## Methodology exception

No pre-feature frontend mutation baseline exists because the fault-reporting
source did not exist before implementation. The first mutation measurement is
post-implementation and descriptive only; it is not compared with the historical
backend score. Seeded-fault sensitivity is separate from independent adversarial
review.

## Final PR draft

### Proposed title

`feat: add authenticated fault reporting`

### Proposed body

## Summary

- Add an authenticated fault-reporting flow using frontend Server Actions and Firebase Admin.
- Validate three categories and trimmed descriptions, reject unknown/forged fields, and return the Firestore document ID as the user-visible reference.
- List only the signed-in user's reports newest-first and deny direct client Firestore access to `faultReports`.

## Type of change

- [x] New feature (`feat:`)
- [ ] Bug fix (`fix:`)
- [ ] Refactor (`refactor:`)
- [ ] Documentation (`docs:`)
- [ ] Infrastructure / CI (`chore:`, `build:`, `ci:`)

## Test plan

- [x] `pnpm run test:all` — passed (backend 5 tests; frontend 24 tests in the final clean run)
- [x] `pnpm run typecheck` — passed
- [x] `pnpm run lint` — passed
- [x] `pnpm run build` — passed
- [x] `pnpm run validate` — passed
- [x] Local Firebase integration — User A create/list/refresh/order and User B owner-filtered list passed; live whitespace rejection passed
- [x] Firestore rules — deployed rules denied direct client reads/writes with HTTP 403
- [ ] Deployed-preview acceptance — pending; no preview URL or deployed commit SHA recorded
- [ ] Gitleaks — pending CI execution

## AI use declaration

- [ ] No AI-assisted tools were used to create this change.
- [x] AI-assisted tools were used to create this change.

If AI was used:

- Tool/model: GitHub Copilot interface; model not disclosed by the interface. Custom agents: none. Delegated read-only `code-review` agents: `7fce3b71-5019-4aaf-859f-ab6cb1121084` and `b0eda045-3399-4d51-990e-85a28b1bd439`.
- What the AI contributed: implementation, tests, evidence drafting, mutation analysis, and read-only adversarial review. Human decisions and approvals controlled scope, Firebase account readiness, rules/index deployment, and acceptance status.

## Confidence

- Confidence level: Medium pending Chirag Wadehra's independent review and security disposition.
- Plan / approach: frontend-only Server Actions with `requireAuth()`, strict Zod validation, Firebase Admin ownership checks, typed Firestore access, and rules-level direct-client denial.
- Assumptions: local Firebase checks used only synthetic accounts/data; no production/customer data was used.
- Alternatives considered: no Express route was added; no direct-ID UI or production-accessible test endpoint was added solely to close live-testing limitations.
- Known edge cases / limitations: direct-ID and unauthenticated Server Action live checks lack a safe existing harness; live fault injection was not performed; deployed-preview checks remain pending.

## Firestore changes

- [ ] No Firestore changes
- [x] Security rules updated (`firebase/firestore.rules`)
- [x] Schema documented (`docs/FIRESTORE-SCHEMA.md`)
- [x] Indexes updated (`firebase/firestore.indexes.json`)

The rules release is active in development project `nbn-sdlc-demo` as ruleset `f8d660ad-dba6-42e5-b140-1826ba927d9a`. The approved composite index was created manually by the human operator and verified `READY`; its definition matches the repository file. No application deployment, production promotion, push, or merge was performed.

## Evidence links

- Issue: https://github.com/Chirag123213/nbn-sdlc-demo/issues/57
- Acceptance matrix: `docs/research/fault-reporting/evidence/run-2026-09-27/ac-matrix.md`
- Integration results: `docs/research/fault-reporting/evidence/run-2026-09-27/integration-results.md`
- Deployment record: `docs/research/fault-reporting/evidence/run-2026-09-27/deployment.md`
- Chirag review checklist: `docs/research/fault-reporting/evidence/run-2026-09-27/chirag-review-checklist.md`
- Fresh adversarial review: `docs/research/fault-reporting/evidence/run-2026-09-27/adversarial-review-fresh.md`
- Mutation comparison: `docs/research/fault-reporting/evidence/run-2026-09-27/mutation/revised-gap-analysis.md`
- Security/audit disposition: `docs/research/fault-reporting/evidence/run-2026-09-27/tooling-and-security.md`
- Planning prompt: `docs/research/fault-reporting/evidence/run-2026-09-27/planning-prompt.txt`
- Session reference: `8b0a3925-489a-4983-82d5-794b8316898e`

## Acceptance gates

Final human acceptance, Chirag's review, dependency-advisory disposition, Gitleaks, and deployed-preview acceptance remain pending. The feature must not be described as fully accepted.
