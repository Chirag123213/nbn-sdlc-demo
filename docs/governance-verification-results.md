## Unapproved PR merge blocking

**Control type:** Human / GitHub ruleset

**Test PR:** #43

**Owner account test**
- Account: Chirag123213
- Result: Merge blocked
- GitHub message: "At least 2 approving reviews are required by reviewers with write access."
- All CI checks had passed, confirming the missing approvals were the blocking condition.

Evidence from Chirag123213 account (owner)

![Owner account blocked from merging](image.png)


**Collaborator account test**
- Account: Chirag361
- Result: Merge blocked
- GitHub message: "At least 2 approving reviews are required by reviewers with write access."
- All CI checks had passed, confirming the missing approvals were the blocking condition.

![Collaborator account blocked from merging](image-1.png)

**Result:** PASS — an unapproved PR cannot be merged by either the repository owner or a collaborator.