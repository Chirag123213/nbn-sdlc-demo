# AI Testing and Verification


## Verification Problem
The verification problem arises when an AI agent writes both the implementation and the tests used to verify it. This is a trap because a passing test suite is not independent verification when the agent has effectively written both sides of the exam. The tests may pass while still failing to detect real defects in the code.

## Harness Inventory

The repository uses Git hooks, AI-agent-specific safeguards, GitHub Actions checks and human review to verify changes. These mechanisms apply at different stages and do not all provide the same level of enforcement.

| Harness | Holder | Runs for | Reasoning |
| --- | --- | --- | --- |
| Placeholder validation | Hook (git) | All tools, when Lefthook is installed | Checks for unreplaced placeholders before a commit. |
| Prettier formatting | No gate (formatting hook) | All tools, when Lefthook is installed | Automatically formats supported staged files, but `|| true` means formatting errors do not block the commit. |
| Frontend ESLint | Hook (git) | All tools, when Lefthook is installed | Checks staged frontend TypeScript files. |
| Backend ESLint | Hook (git) | All tools, when Lefthook is installed | Checks staged backend TypeScript files. |
| Conventional Commit validation | Hook (git) | All tools, when Lefthook is installed | Rejects commit messages that do not follow the required format. |
| Claude `permissions.deny` rules | Claude Code permission rule | Claude Code only | Restricts specified dangerous commands and protected file access. This is a tool-specific permission mechanism rather than a Git hook. |
| Block `any` usage | Hook (agent) | Claude Code only | Checks TypeScript edits for forbidden `any` patterns. |
| Block public server secrets | Hook (agent) | Claude Code only | Checks for inappropriate `NEXT_PUBLIC_` prefixes on server-only secrets. |
| Block environment-specific `.env` files | Hook (agent) | Claude Code only | Rejects specified environment-file creation patterns. |
| Block `use client` in Firebase Admin module | Hook (agent) | Claude Code only | Checks that the Firebase Admin module remains server-side. |
| Block deep relative imports | Hook (agent) | Claude Code only | Checks the configured frontend import convention. |
| Frontend typecheck after agent edits | Hook (agent) | Claude Code only | Runs the configured type-checking command after relevant frontend changes. |
| Backend typecheck after agent edits | Hook (agent) | Claude Code only | Runs the configured type-checking command after relevant backend changes. |
| Block direct push to `main` | Hook (agent) | Claude Code only | Rejects recognised direct pushes to `main`. |
| Block Firebase deployment without approval | Hook (agent) | Claude Code only | Rejects recognised Firebase deployment commands from the agent. |
| Block force push / `--no-verify` | Hook (agent) | Claude Code only | Rejects recognised dangerous Git command patterns. |
| Copilot push safeguard | Hook (agent) | Copilot only, when configured | `.github/hooks/fault-reporting.json` invokes `scripts/copilot/pre-tool-use.cjs` to reject recognised remote `git push` commands during the experiment. |
| AI Declaration | CI check (required) | GitHub pull requests targeting `main` | Checks that exactly one AI-use declaration option is selected. |
| CI placeholder validation | CI check (required) | GitHub Actions — Lint & Typecheck | Runs `pnpm run validate` as part of the required Lint & Typecheck job. |
| CI lint | CI check (required) | GitHub Actions — Lint & Typecheck | Runs repository linting as part of the required Lint & Typecheck job. |
| CI typecheck | CI check (required) | GitHub Actions — Lint & Typecheck | Runs TypeScript checks as part of the required Lint & Typecheck job. |
| Frontend tests | CI check (required) | GitHub Actions — Frontend Tests | Executes frontend unit/component tests through the required Frontend Tests job. |
| Backend tests | CI check (required) | GitHub Actions — Backend Unit Tests | Executes backend unit tests through the required Backend Unit Tests job. |
| Gitleaks secret scan | CI check (required) | GitHub Actions — Security Scan | Scans for committed credentials as part of the required Security Scan job. |
| Dependency vulnerability audit | CI check (required) | GitHub Actions — Security Scan | Runs the configured dependency audit as part of the required Security Scan job. |
| Manual smoke test | Human | Developer or reviewer | Confirms that the feature behaves correctly against an appropriate Firebase environment. |
| Test adequacy / reviewer judgement | Human | Developer or reviewer | Determines whether the tests meaningfully verify the intended behaviour and acceptance criteria. |

Git hooks operate through Lefthook and apply independently of the AI tool once installed. Agent hooks and permission rules are tool-specific: Claude Code mechanisms do not automatically apply to GitHub Copilot, and vice versa. Agent hooks must not be treated as comprehensive security boundaries. Copilot hooks may fail open on timeout, meaning a timed-out hook may not prevent the intended action.

The CI checks are defined in `.github/workflows/ci.yml`. The active GitHub `main` ruleset requires all five jobs to pass: **AI Declaration**, **Lint & Typecheck**, **Frontend Tests**, **Backend Unit Tests**, and **Security Scan**.

These are enforced CI checks rather than advisory results. GitHub blocks normal merging into `main` if any required check fails or remains incomplete.

Individual commands, such as placeholder validation, linting and type checking, are enforced through their parent required CI job. Similarly, Gitleaks and dependency vulnerability auditing are enforced through the required Security Scan job.

The ruleset also requires two approving reviews and permits squash merging only. These platform restrictions complement the automated verification checks but do not replace the need for human judgement.

Automated checks can detect predefined violations, but they cannot determine whether an implementation or its tests correctly satisfy the requirements. Human review remains necessary.

## Mutation Testing

Mutation testing is the operational answer to the question, "Are the tests correct?" A passing test suite only shows that the implementation satisfies the tests that were written. It does not prove that those tests are capable of detecting real defects in the code.

Therefore, mutation testing checks the quality of a test suite by deliberately making small changes, called mutants, to the implementation and then running the tests again. For example, a comparison operator could be changed or a return value could be altered.

If the tests fail after the change, the mutant is considered killed, which provides evidence that the tests detected the introduced fault. If the tests still pass, it means that the mutant survives, indicating that the test suite may not adequately detect that type of defect.

The mutation score measures the proportion of mutants that are killed by the test suite. A higher score generally indicates that the tests are better at detecting faults, while surviving mutants highlight areas where the test suite may be weak.

For AI-generated tests, the mutation score should be recorded before a human modifies the generated tests so that the original quality of the AI-generated test suite can be measured.

The repository defines mutation-testing configuration in `backend/stryker.config.json`, including thresholds of `high: 80`, `low: 60` and `break: 0`. Although the high and low values classify mutation results, **`break: 0` does not enforce a minimum mutation-score threshold that would fail the run**. The frontend fault-reporting configuration also uses `break: 0`.

Therefore, mutation testing currently provides evidence for human judgement rather than acting as an enforced quality gate. Any proposal to require a minimum mutation score must be agreed upon and configured separately.

## Accountability Chain

AI-assisted work should have a clear accountability chain so that responsibility remains identifiable when an agent contributes to code and problems are discovered later.

The governance model defines four roles:

1. **Human author of record:** The person recorded as responsible for the change in Git.
2. **Agent co-author:** The AI agent that contributed to the implementation, where that contribution is recorded through provenance such as a `Co-authored-by` trailer.
3. **Human approver:** A person who independently reviews and approves the proposed change.
4. **Accountable owner:** The named person who remains responsible for the AI use and its outcomes, as recorded in the governance register.

These roles distinguish code authorship, AI contribution, independent approval and ongoing accountability.

### Current Repository Coverage

| Accountability role | Status | Current repository evidence |
| --- | --- | --- |
| Human author of record | Captured | Git records the author and committer in the commit history. |
| Agent co-author | Captured when the tool adds it; No gate | `Co-authored-by` trailers are supported and have been preserved in the repository, including commit `2c9a958` and the Copilot-assisted commit `9593f1e` associated with PR #63. However, no implemented check requires every AI-assisted commit to contain a trailer. |
| Human approver | Captured | GitHub records pull-request approvals, and the active `main` ruleset requires two approvals. GitHub prevents authors from approving their own pull requests; the reviewer's independence beyond those platform rules still requires consideration. |
| Accountable owner | Recorded in governance register | `docs/AI-register.md` identifies named owners for AI use cases. This provides a governance record, but the repository does not automatically verify that every pull request corresponds to an entry in the register. |

The accountability chain is therefore partially supported through Git metadata, GitHub reviews and the AI register. These records improve traceability, but they should not be mistaken for a fully automated provenance and accountability enforcement system.


## Gitleaks CI Verification

The repository uses `gitleaks/gitleaks-action@v3` as part of the Security Scan CI job. The action was verified through the CI run for PR #31.

During the run, GitHub successfully resolved and downloaded `gitleaks/gitleaks-action@v3`. The action executed Gitleaks version 8.24.3, scanned five commits and completed successfully with no leaks detected.

This confirms that the configured Gitleaks action resolves correctly and that the secret-scanning job actually executes in the CI pipeline.

## Gitleaks Failure Verification

A synthetic AWS-style credential was committed to the temporary `feature/gitleaks-verification` branch and submitted through PR #38 to verify that Gitleaks detects committed credentials and fails the Security Scan job. This historical test verified the scanning mechanism; the Security Scan job is now also enforced as a required status check by the active `main` ruleset.

The Gitleaks Security Scan detected the credential in `gitleaks-test.txt` on line 2 and classified it under the `aws-access-token` rule. The scan reported one leak and the Security Scan job failed as expected.

The relevant Gitleaks output was:

```text
Finding:     ...aws_access_key_id = REDACTED
Secret:      REDACTED
RuleID:      aws-access-token
File:        gitleaks-test.txt
Line:        2

1 commits scanned.
leaks found: 1

🛑 Leaks detected, see job summary for details
```


This confirms that Gitleaks not only executes in the CI pipeline, but also detects a test credential and prevents the security check from passing.
