## Test 1: Unapproved PR merge blocking

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


## Test 2: Unanswered AI declaration fails CI

**Control type:** CI check

**Test PR:** #43

The AI-use declaration was edited so that neither declaration option was selected.

Result: PASS — the required `AI Declaration` CI check failed while the remaining checks passed.

![Unanswered AI declaration causes required CI failure](image-2.png)

After verification, the correct AI-assisted option was restored and the `AI Declaration` check passed again.

![Answered AI declaration causes required CI pass](image-3.png)