# Repository Instructions

- Use pnpm for package management.
- Follow the repository's existing coding conventions.
- Keep changes within the scope of the requested task.
- Do not modify unrelated files.
- Run the relevant tests and checks before considering work complete.

## AI-Assisted Development Workflow

Follow this workflow for every development task.

### 1. Understand and plan
- Read the task requirements, acceptance criteria, and relevant repository context.
- Identify the proposed implementation steps, affected files, required tests, dependencies, and risks.
- Identify any missing or ambiguous requirements before proceeding.
- Present the implementation plan to the human for review.

### 2. Human approval gate
- STOP after presenting the plan.
- Do not create, edit, or delete implementation or test files before receiving explicit human approval.
- Do not interpret silence or the original task request as approval.
- If implementation requires changes outside the approved scope, stop and request further approval.

### 3. Tests first
- After plan approval, write or update tests before changing implementation code.
- Cover the expected behaviour, relevant edge cases, and failure conditions.
- Run the new tests and record their initial results.
- Where feasible, confirm that the tests fail for the expected missing behaviour before implementing the feature.
- If automated tests are not applicable, explain why and propose an alternative verification method.

### 4. Implementation
- Implement only the approved changes.
- Follow existing project conventions and architecture.
- Make the tests pass without weakening or removing valid assertions.
- Do not modify unrelated functionality.

### 5. Verification
- Run relevant tests, linting, type checks, builds, and security checks.
- Report results accurately, including failures and limitations.
- Review the implementation against the task requirements and acceptance criteria.
- Present the changes and verification evidence for human review.

### 6. Human accountability
- Human approval is required before implementation and before accepting the final change.
- AI must not approve or merge its own changes.
- Record AI assistance in the repository's existing declaration process.
- Do not bypass repository checks, permissions, or approval gates.

