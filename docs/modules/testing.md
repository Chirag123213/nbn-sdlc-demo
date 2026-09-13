# AI Testing and Verification


## Verification Problem
The verification problem arises when an AI agent writes both the implementation and the tests used to verify it. This is a trap because a passing test suite is not independent verification when the agent has effectively written both sides of the exam. The tests may pass while still failing to detect real defects in the code.

## Harness Inventory

| Harness                                     | Classification | Reasoning                                                                                                        |
| ------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------- |
| Placeholder validation                      | Hook           | Runs automatically during pre-commit and checks staged work for unreplaced placeholders.                         |
| Prettier formatting                         | Hook           | Runs automatically during the pre-commit lifecycle on staged files.                                              |
| Frontend ESLint                             | Hook           | Runs automatically on staged frontend TypeScript files before commit.                                            |
| Backend ESLint                              | Hook           | Runs automatically on staged backend TypeScript files before commit.                                             |
| Conventional Commit validation              | Hook           | Runs during `commit-msg` and rejects incorrectly formatted commit messages.                                      |
| Claude `permissions.deny` rules             | Hook           | Deterministically prevent Claude from executing specified dangerous commands or reading protected file patterns. |
| Block `any` usage                           | Hook           | Runs after Claude edits/writes TypeScript and blocks forbidden `any` patterns.                                   |
| Block public server secrets                 | Hook           | Runs after edits and blocks `NEXT_PUBLIC_` exposure of server-only secrets.                                      |
| Block environment-specific `.env` files     | Hook           | Prevents Claude from creating certain committed environment files.                                               |
| Block `use client` in Firebase admin module | Hook           | Enforces that server-only Firebase admin code remains server-side.                                               |
| Block deep relative imports                 | Hook           | Enforces the project's frontend import convention.                                                               |
| Frontend typecheck after Claude edit        | Hook           | Automatically typechecks frontend source changes made by Claude.                                                 |
| Backend typecheck after Claude edit         | Hook           | Automatically typechecks backend source changes made by Claude.                                                  |
| Block direct push to `main`                 | Hook           | Runs before Claude executes Bash and blocks direct pushes to `main`.                                             |
| Block Firebase deploy without approval      | Hook           | Prevents Claude from deploying to production automatically.                                                      |
| Block force push / `--no-verify`            | Hook           | Prevents bypassing repository safeguards.                                                                        |
| CI placeholder validation                   | CI check       | Runs `pnpm run validate` in GitHub Actions.                                                                      |
| CI lint                                     | CI check       | Runs repository linting independently in GitHub Actions.                                                         |
| CI typecheck                                | CI check       | Runs the TypeScript checks in GitHub Actions.                                                                    |
| Frontend tests                              | CI check       | Executes the frontend component/unit tests on PRs and pushes to `main`.                                          |
| Backend tests                               | CI check       | Executes backend unit tests.                                                                                     |
| Gitleaks secret scan                        | CI check       | Scans repository history/content for likely leaked credentials.                                                  |
| Dependency vulnerability audit              | CI check       | Runs `pnpm audit --audit-level=high`.                                                                            |
| Manual smoke test                           | Human          | Requires a person to exercise the change against a development Firebase project.                                 |
| Test adequacy / reviewer judgement          | Human          | A human decides whether the tests actually cover the intended behaviour and are trustworthy.                     |

Hooks and CI checks provide automated, deterministic checks against predefined rules. Hooks run at specific points in the local or agent workflow, while CI checks run in the repository's GitHub Actions pipeline. These automated checks can identify rule violations, test failures, type errors, exposed secrets and other predefined problems, but they cannot independently judge whether the implementation or its tests are suitable for the intended requirements. Therefore, Human judgement is required to assess test adequacy, correctness and whether the change actually satisfies its intended purpose.
