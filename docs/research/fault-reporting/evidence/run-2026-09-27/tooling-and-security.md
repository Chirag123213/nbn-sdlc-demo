# FR-01 tooling and security evidence

## Official references checked

- Stryker JS getting started: https://stryker-mutator.io/docs/stryker-js/getting-started/
- pnpm audit documentation: https://pnpm.io/cli/audit

Local observations: Node `v24.19.0`, pnpm `11.20.0`, Stryker core/Vitest runner `9.6.1`, Vitest `3.2.7`, and Next `16.3.4`. These do not claim CI uses the same versions.

## Secret scanning

Gitleaks remains **pending**; the executable was unavailable locally. Existing CI should run the scan after a human push. The CI result, not tool availability, determines the gate.

## Current dependency audit

A fresh `pnpm audit --prod=false --json` run on 2026-10-02 reported **23 advisories: 1 critical, 8 high, 12 moderate, 2 low**. The raw result is preserved in `dependency-audit-current.json`; exact paths are retained in the prior path export and the current raw JSON. No upgrades, overrides, or remediations were applied.

| Affected package/path group | Severity | Exposure | Smallest proposed fix | Compatibility impact / disposition |
|---|---|---|---|---|
| `next` via root and `frontend>next` | Critical: Next.js `next/og` `ImageResponse` RCE; patched `>=16.3.6` | Production frontend if the vulnerable API is reachable; current feature does not add an ImageResponse route, but the dependency is runtime production code. | Upgrade Next to the minimum patched release and run build, typecheck, lint, and app smoke checks. | Requires human security/scope approval; framework patch may alter build/runtime behavior. |
| `@grpc/grpc-js` via `backend>firebase-admin>...>google-gax>@grpc/grpc-js` and Firebase frontend paths | High (backend and frontend paths), low error-message advisory on same paths; patched `>=1.14.5` server / `>=1.13.6` frontend | Production backend and frontend Firebase dependency paths; configuration-dependent certificate issue is not established as exploitable here. | Apply the minimum compatible transitive/package updates and rerun backend/frontend checks. | Requires lockfile compatibility review; do not override blindly. |
| `brace-expansion` through ESLint, Vitest coverage, Stryker, and minimatch paths | 6 high and 3 moderate findings; patched ranges include `>=1.1.20`, `>=2.1.6`, `>=5.0.10` (minimum varies by path) | Primarily development/CI tooling; not an application runtime path in the reported chains. | Use minimum compatible transitive overrides or update direct tooling, then re-audit. | Overrides may affect lint/test/mutation tooling; approval required. |
| `qs` via Express/body-parser and Stryker `typed-rest-client` paths | Moderate; patched `>=6.16.0` (other advisories have lower fixes) | Express path is production backend exposure; Stryker path is development/CI. | Evaluate a narrow `qs` remediation and run backend plus mutation checks. | Must preserve Express/body-parser compatibility; no broad upgrade without approval. |
| `ip-address` via `backend>express-rate-limit>ip-address` and type-only related paths | Moderate; patched `>=10.5.1` / `>=10.7.1` depending advisory | Production backend rate-limit/SSRF trust-boundary path. | Minimum compatible transitive update, followed by backend security and route tests. | Requires compatibility review of express-rate-limit; approval required. |
| `vitest` / `@vitest/mocker` via Stryker, coverage, and test paths | Moderate; patched `>=4.1.11` | Development/CI only for this feature. | Evaluate Vitest upgrade or a compatible patched dependency path. | Major-version upgrade risk; do not apply silently. |

The current audit is not directly comparable with the historical 18-advisory record because the audit and lockfile environment changed. Security acceptance remains pending until a human approves remediation or explicitly dispositions each finding.
