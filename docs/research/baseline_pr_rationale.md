### Rationale for selecting PR #31 as the baseline

PR #31, **“Secret scanning”**, was selected as the baseline because it represents real implementation work rather than documentation-only changes. The PR modified the CI workflow, updated dependencies, and introduced a security-related capability, which makes it closer to the type of engineering activity expected in the fault-reporting proof of concept.

The PR is also useful because it exercised several of the same lifecycle stages being measured in the PoC. It involved development and configuration changes, CI execution, security verification, dependency updates, and human review before merge. The PR changed six files, added 234 lines, deleted 215 lines, and went through five commits before receiving approval from another collaborator.

It was therefore chosen because it provides a more representative pre-PoC comparison point than the repository’s predominantly documentation-focused PRs. It is not an identical feature comparison, but it provides a reasonable baseline for repository-level measures such as PR size, rework, CI behaviour, review activity, and time to approval.
