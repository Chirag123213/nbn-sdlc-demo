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

- the GitHub issue that defines the task
- the acceptance criteria that define what "done" means
- the repository files that provide implementation context
- any explicit scope or exclusions that prevent unrelated changes

The agent should not be expected to infer missing requirements. If important information is not written in the issue or referenced repository context, the task is not ready to be delegated.

## The output recieved from Copilot

The result of handing a development task to Copilot should be an inspectable code change rather than only a conversational answer. The exact form of the result depends on whether the Copilot cloud agent or Copilot Agent mode in VS Code is used.

### Copilot cloud agent

When Copilot is assigned a GitHub issue, it works on the task in its own development environment and produces the implementation on a branch.

For an issue assigned directly to Copilot, the main output is a GitHub pull request. Copilot pushes its implementation changes as commits and requests human review when it has finished.

The reviewer then receives:

- a pull request linked to the task
- the files added, changed or deleted in the PR diff
- the commits produced by Copilot
- the results of any tests or validation Copilot performed
- the Copilot agent session log showing how the task was carried out

The pull request is the reviewable artifact. The conversational output from the agent can help explain the implementation, but it does not replace reviewing the actual diff.

### Copilot Agent mode in VS Code

In VS Code Agent mode, Copilot makes changes in the developer's workspace or isolated worktree rather than automatically handing back a completed GitHub pull request.

After the agent performs the task, the developer can inspect the files that were added, modified or deleted and review the resulting diffs in VS Code.

The developer therefore receives:

- changed, added or deleted workspace files
- a diff showing the exact code changes
- the agent's explanation or summary of the work
- terminal output from commands the agent ran
- results from tests, linting or other validation performed during the session

These changes remain part of the development workspace until the developer reviews them and decides whether they should proceed through the normal Git workflow.

If the changes are accepted, they can then be committed, pushed to the feature branch and submitted through a pull request.

### Output rule

Regardless of which Copilot mode is used, the implementation itself is the artifact that must be reviewed.

A statement from Copilot that the task is complete, that tests pass, or that the acceptance criteria have been satisfied is not sufficient evidence on its own. The reviewer should inspect the resulting diff and the relevant validation evidence before accepting the change.