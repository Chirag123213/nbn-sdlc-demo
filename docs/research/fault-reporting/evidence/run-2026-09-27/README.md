# FR-01 evidence index

Start with [AC1–AC6](ac-matrix.md), [remaining gates](gates.md),
[integration results](integration-results.md), [deployment](deployment.md),
[security](tooling-and-security.md) and [human review checklist](chirag-review-checklist.md).
PR text is in [pr-evidence.md](pr-evidence.md). Independent agent review is recorded
in [fresh review](adversarial-review-fresh.md); it does not substitute for human review.

Usage and retrospective timing: [usage-and-time-estimates.md](usage-and-time-estimates.md).

## Raw evidence

Logs are historical checkpoints, not blanket claims about the current checkout.
The names `final` and `revised` are retained to avoid breaking historical references;
[mutation history](mutation/revised-gap-analysis.md) defines their order and meaning.
Preliminary/failed experiments are preserved intentionally. Exact source SHAs and
full timestamps were not captured in every log; do not infer them from filenames.

- [dependency-audit-current.json](dependency-audit-current.json)
- [dependency-audit-paths.txt](dependency-audit-paths.txt)
- [dependency-audit-summary.json](dependency-audit-summary.json)
- [env-sync.txt](env-sync.txt)
- [mutation/frontend-mutation-final.json](mutation/frontend-mutation-final.json)
- [mutation/frontend-mutation-final.txt](mutation/frontend-mutation-final.txt)
- [mutation/frontend-mutation-revised.json](mutation/frontend-mutation-revised.json)
- [mutation/frontend-mutation-revised.txt](mutation/frontend-mutation-revised.txt)
- [mutation/frontend-mutation.json](mutation/frontend-mutation.json)
- [mutation/frontend-mutation.txt](mutation/frontend-mutation.txt)
- [mutation/post-restore-tests.txt](mutation/post-restore-tests.txt)
- [mutation/post-revision-restore-tests.txt](mutation/post-revision-restore-tests.txt)
- [mutation/seeded-blank-description-final.txt](mutation/seeded-blank-description-final.txt)
- [mutation/seeded-blank-description-revised.txt](mutation/seeded-blank-description-revised.txt)
- [mutation/seeded-blank-description.txt](mutation/seeded-blank-description.txt)
- [mutation/seeded-direct-id-ownership-final.txt](mutation/seeded-direct-id-ownership-final.txt)
- [mutation/seeded-direct-id-ownership-revised.txt](mutation/seeded-direct-id-ownership-revised.txt)
- [mutation/seeded-direct-id-ownership.txt](mutation/seeded-direct-id-ownership.txt)
- [planning-prompt.txt](planning-prompt.txt)
- [post-restoration-tests.txt](post-restoration-tests.txt)
- [post-revision-test-all-clean.txt](post-revision-test-all-clean.txt)
- [post-revision-tests-clean.txt](post-revision-tests-clean.txt)

## Cleanup on 2026-10-02

Five short `.txt` files were consolidated into [routine-checks.md](routine-checks.md),
including one byte-identical validation output represented once. Their original
names and unique output text are preserved there. No mutation, seeded-fault,
restoration-test, prompt or audit output was removed. Historical status documents
were labelled or corrected to agree with the later integration records.
The older audit path export is historical and is not a replacement for the newer
raw audit. Short and full test runs are separate checkpoints, not duplicate files.
