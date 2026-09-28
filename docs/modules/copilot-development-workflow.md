# Copilot Development Workflow

## What is handed to Copilot

Before Copilot begins implementation, it should receive a complete task package rather than only a short coding request. The handoff consists of the issue, its acceptance criteria, and the repository context needed to implement the change correctly.

### Issue

The GitHub issue is the main task definition. It should describe the requested change, why it is needed, and the boundaries of the work.

For the Copilot cloud agent, the issue is handed over directly by assigning Copilot to the GitHub issue. The issue itself becomes part of the agent's task context.

For Copilot Agent mode in VS Code, the issue can be added explicitly as context by clicking the **+ (Add Context)** button and selecting **Issue**, by pasting the issue URL directly into the prompt, or by referring to the issue from the agent session.

### Acceptance criteria

The acceptance criteria define what must be true for the implementation to be considered complete.

If the criteria are contained in the GitHub issue, Copilot receives them with the issue. If the criteria are stored separately in the repository, the issue or prompt should reference the exact repository path rather than relying on Copilot to discover them.

For example:

`docs/research/fault-reporting/feature-brief.md`

This repository already uses that file to record the fault-reporting user story, acceptance criteria, exclusions and proposed scope.

### Repository context

Repository context explains how the change must fit into the existing project.

Repository-wide Copilot guidance is stored in:

`.github/copilot-instructions.md`

Copilot uses these instructions as repository-level guidance when working in the project.

Task-specific context should be referenced explicitly where possible. Relevant specifications, architecture documents, existing implementations or other source files should be named by path rather than copied into an ad-hoc chat prompt.

In VS Code Agent mode, important files can also be attached directly as context using the context picker or file references.

### Handoff rule

The handoff should identify:

- the GitHub issue that defines the task;
- the acceptance criteria that define what "done" means;
- the repository files that provide implementation context; and
- any explicit scope or exclusions that prevent unrelated changes.

The agent should not be expected to infer missing requirements. If important information is not written in the issue or referenced repository context, the task is not ready to be delegated.