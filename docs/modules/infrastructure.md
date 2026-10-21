# Deployment and Infrastructure

This module explains how the infrastructure in this repository supports the AI-assisted Software Development Lifecycle (SDLC), from receiving a development task to deploying and verifying the finished application.

The framework uses GitHub Copilot to assist development, repository instructions and hooks to guide and safeguard changes, GitHub Actions for automated verification, and Vercel and Firebase for application deployment. Human developers remain responsible for approving changes and verifying their outcomes.

## 1. Starting development: task preparation and AI infrastructure

Development begins with an approved feature request containing clear requirements, acceptance criteria and scope.

The repository provides several mechanisms for supporting AI-assisted development:

| Infrastructure | Purpose | Repository location |
| --- | --- | --- |
| Copilot instructions | Provides repository-wide development guidance and expectations | `.github/copilot-instructions.md` |
| Reusable prompts | Stores repeatable instructions for specific development tasks | `.github/prompts/` |
| Copilot skills | Defines reusable multi-step procedures | `.github/skills/` |
| Custom agents | Provides specialised agent configurations | `.github/agents/` |
| Copilot hooks | Adds tool-specific safeguards around agent actions | `.github/hooks/` |

### Development process

1. Review the GitHub issue and confirm the acceptance criteria.
2. Create a feature branch from the latest `main`.
3. Provide Copilot with the task requirements and relevant repository context.
4. Request an implementation plan before allowing the agent to modify code.
5. Review and approve the plan before implementation begins.

For example, a developer can create a feature branch using:

```bash
git switch main
git pull origin main
git switch -c feature/fault-report
```

The repository's Copilot instructions require an implementation plan, human approval, tests before implementation and verification before accepting the final change.

Reusable prompts and skills can help developers perform these activities consistently. However, instructions, prompts, skills and agent configurations do not independently enforce compliance.

**Checkpoint and holder: Human.** A developer must approve the implementation plan and confirm that the task is ready.

**Failure mode:** If an AI agent begins implementation without sufficiently defined requirements or human approval, it may introduce unnecessary changes or implement incorrect functionality. Written instructions alone cannot guarantee that the agent will stop.

**Worked example:** For the FR-01 fault-reporting feature, the team defined acceptance criteria and approved the planned implementation before authorising development.

Detailed instructions for this stage are available in `docs/modules/copilot-development-workflow.md` and `docs/modules/prompt-practice.md`.

## 2. Development and local verification infrastructure

After plan approval, Copilot assists with writing tests and implementing the feature.

The repository provides automated mechanisms to identify common problems before changes reach GitHub.

### Git hooks

Git hooks are configured through `lefthook.yml` and installed as part of the repository's dependency setup.

| Hook | Purpose |
| --- | --- |
| Placeholder validation | Detects unreplaced placeholders |
| Prettier formatting | Formats supported staged files |
| Frontend ESLint | Checks staged frontend source files |
| Backend ESLint | Checks staged backend source files |
| Conventional Commit validation | Rejects commit messages that do not follow the expected format |

**Checkpoint and holder: Hook (git).** Git hooks run at their configured triggers when installed, independently of which AI tool generated the changes. Their enforcement is limited to the commands and exit behaviour defined in `lefthook.yml`.

### AI agent hooks

The repository also includes `.github/hooks/fault-reporting.json`, which invokes `scripts/copilot/pre-tool-use.cjs`.

This experimental Copilot safeguard rejects recognised remote `git push` commands, keeping pushes under human control during the fault-reporting experiment.

**Checkpoint and holder: Hook (agent), when active in the supported Copilot environment.** This is a tool-specific, command-pattern-based safeguard, not a comprehensive security boundary. It does not replace GitHub's server-side restrictions.

### Local verification

Before requesting review, developers should run the relevant repository checks:

```bash
pnpm run validate
pnpm run lint
pnpm run typecheck
pnpm run test:all
```

These commands check placeholders, linting, TypeScript types and the frontend/backend test suites.

The repository also supports mutation testing using Stryker. The backend mutation workflow is configured in `.github/workflows/mutation.yml` and can run automatically for relevant pull-request changes or through manual workflow dispatch.

Mutation testing assesses whether tests can detect deliberately introduced code changes. The configured `break: 0` threshold means mutation scores are reported as evidence rather than enforcing a minimum passing score.

**Checkpoint and holder: Human, supported by Git hooks and automated test results.** Developers must examine failures, assess test quality and confirm that the implementation satisfies its acceptance criteria.

**Failure mode:** AI-generated code and AI-generated tests can agree with each other while both being incorrect. Passing tests therefore do not automatically establish implementation correctness.

**Successful outcome:** The implementation has been inspected, relevant local checks have completed, and test results and limitations are recorded.

The full verification process is documented in `docs/modules/testing.md`.

## 3. Pull requests and continuous integration

Once the implementation has been locally verified, the developer pushes the feature branch and opens a pull request targeting `main`.

### Pull request infrastructure

The repository's `.github/pull_request_template.md` requires developers to provide information about:

- The proposed changes and their type.
- Testing and verification performed.
- Whether AI-assisted tools were used.
- AI contribution details and confidence information.
- Any Firestore or environment-variable changes.

This provides reviewers with a consistent record of the implementation and AI involvement.

### Continuous integration

Pull requests trigger the GitHub Actions workflow defined in `.github/workflows/ci.yml`.

| Check | Purpose | Current enforcement |
| --- | --- | --- |
| AI Declaration | Verifies that exactly one AI-use declaration option was selected | Required |
| Lint & Typecheck | Runs placeholder validation, linting and type checking | Advisory |
| Frontend Tests | Runs frontend unit/component tests | Advisory |
| Backend Unit Tests | Runs backend tests | Advisory |
| Security Scan | Runs Gitleaks secret scanning and dependency vulnerability auditing | Advisory |

At the verified configuration, only `AI Declaration` is a required status check in the GitHub `main` ruleset. The remaining jobs execute and report results but are not required for merging.

**Checkpoint and holder: CI check (required) for AI Declaration; CI check (advisory) for the other jobs.**

Developers should investigate failed checks before requesting approval, even when those checks are not technically enforced by GitHub.

**Failure mode:** If important CI checks remain advisory, GitHub may permit a merge despite failing tests or security scans, provided the required ruleset conditions are satisfied.

**Successful outcome:** The pull request records the AI declaration, verification results and any unresolved findings for human review.

## 4. Preview deployment and human review (Task 8.1)

The repository uses Vercel's Git integration to deploy the Next.js frontend.

A pull request can receive a preview deployment, allowing reviewers to test the application before merging it into production.

The repository has previously verified working preview deployments on PRs #9, #14 and #43, as recorded in `docs/governance-verification-results.md`.

### Preview verification

1. Open the pull request and locate its Vercel preview deployment.
2. Confirm the preview corresponds to the latest commit.
3. Open the preview URL and check that the application loads.
4. Test the implemented feature against its acceptance criteria.
5. Record any failures and request corrections before approval.

For the fault-reporting feature, relevant checks include submitting a valid report, rejecting invalid inputs, retrieving saved reports, and verifying that different users cannot access each other's reports.

**Checkpoint and holder: Human.** Vercel creates the deployment, but a developer or reviewer must assess whether the deployed feature works correctly.

**Failure mode:** Code may pass local tests but fail in the preview environment because of missing environment variables, Firebase configuration, authentication or database permissions.

**Successful outcome:** A preview of the intended commit is available and its relevant acceptance checks have been completed and recorded.

The proposed Stage 8 success metric is for every pull request to have a traceable preview deployment before review begins.

## 5. Approval, merging and production deployment (Task 8.3)

After the implementation and preview have been reviewed, the pull request can proceed towards merging.

### GitHub approval infrastructure

The active `main` ruleset requires two approving reviews and permits squash merging. It also restricts branch deletion and non-fast-forward changes.

Reviewers are responsible for checking the implementation, acceptance criteria, automated results and security implications.

**Checkpoint and holder: Platform rule and Human.** GitHub enforces its configured merge restrictions, while reviewers determine whether the change is suitable for release.

### Production deployment infrastructure

After a change is merged into `main`, the repository uses two main deployment mechanisms.

**Frontend deployment — Vercel**

Vercel's Git integration automatically builds and deploys changes from the production branch.

Developers should verify the deployment status in Vercel and confirm that the deployed version corresponds to the intended merged commit.

**Firestore infrastructure — Firebase**

The `.github/workflows/deploy.yml` workflow deploys Firestore security rules when `firebase/firestore.rules` changes on a push to `main`.

The workflow uses GitHub Actions secrets for Firebase authentication and deployment.

Firestore indexes are managed separately. The automatic workflow deploys rules only, so new or modified indexes require separate handling and verification.

The optional Express backend has a manual Cloud Functions deployment job and is not part of the normal Next.js frontend deployment.

Detailed setup and commands are documented in `docs/CI-CD.md` and `docs/DEPLOY-TO-VERCEL.md`.

**Checkpoint and holder: Human for release approval; no separate enforced gate for Vercel's automatic production promotion.**

The practical release decision occurs when the approved pull request is merged. A successful merge initiates deployment but does not guarantee that production deployment or verification succeeds.

**Failure mode:** A feature can be merged and deployed while important Firestore rules, indexes or environment configuration remain incorrect.

**Successful outcome:** The intended frontend version is deployed, relevant Firebase changes are applied, and their deployment results are available for inspection.

## 6. Production verification and recovery

Deployment is not complete simply because GitHub Actions or Vercel reports a successful build.

### Production verification

After deployment, the responsible developer or reviewer should:

1. Confirm that the intended commit is deployed.
2. Verify that the application loads and authentication works.
3. Test the new feature against its acceptance criteria.
4. Confirm that the relevant Firestore rules and indexes operate correctly.
5. Record the verification results and any remaining limitations.

**Checkpoint and holder: Human.** A person must inspect the deployed application and accept the evidence.

**Failure mode:** A successful deployment can still contain runtime failures, incorrect permissions or unexpected application behaviour that automated build checks do not detect.

### Rollback and recovery

If the deployment introduces a serious problem, an authorised developer or operator should investigate and determine whether rollback is necessary.

For frontend failures, Vercel's deployment history can be used to restore a previously working version. The corresponding source change can then be corrected or reverted through GitHub's normal review process.

Firestore changes must be considered separately. Restoring an earlier frontend deployment does not automatically restore previous database rules or indexes.

The repository does not currently implement automated production rollback.

**Checkpoint and holder: Human.** Recovery decisions and verification remain the responsibility of an authorised person.

**Successful outcome:** The working application is restored, recovery is verified and the incident is documented.

Important findings should also be incorporated into the framework when appropriate, such as updating Copilot instructions, reusable prompts, skills, repository hooks or technical documentation. These changes should be reviewed and version-controlled so future development benefits from them.

## 7. Worked example: FR-01 fault-reporting feature

The FR-01 proof of concept demonstrates how the framework's development, verification and infrastructure mechanisms interact.

1. **Planning:** Requirements and acceptance criteria were recorded, with human approval before implementation.
2. **Development:** Copilot assisted with the implementation while repository instructions, tests and review procedures guided the work.
3. **Verification:** Unit tests, mutation testing, security-related checks and Firebase integration checks provided evidence for review.
4. **Infrastructure:** The initial Firestore rules/index deployment attempt encountered permission errors. The approved rules were subsequently activated through the Firestore Rules API, and the required composite index was created manually and verified `READY`.
5. **Acceptance:** The available FR-01 evidence records local integration and infrastructure results, but does not establish completed preview acceptance or final independent human acceptance.

The example demonstrates why successful code generation and automated testing are not sufficient by themselves. Developers must also verify that infrastructure changes were applied correctly and that the deployed application satisfies the requirements.

The evidence is recorded in `docs/research/fault-reporting/evidence/run-2026-09-27/`.

## 8. Overall workflow

The repository's AI-assisted SDLC workflow follows this sequence:

**Approved requirements → Feature branch → Copilot-assisted development → Git hooks and local verification → Pull request → CI and security checks → Vercel preview → Human review → Merge to `main` → Vercel/Firebase deployment → Production verification → Recovery or feedback where needed**

The framework combines three types of responsibility:

- **AI assistance:** Helps developers plan, implement, test, review and document changes.
- **Infrastructure and automation:** Provides reusable instructions, repository safeguards, automated verification and deployment mechanisms.
- **Human accountability:** Approves plans, judges implementation quality, authorises releases and verifies successful deployment.

Not every documented control is enforced. The holder of each checkpoint must be identified accurately, and automated results must not be confused with human acceptance.
