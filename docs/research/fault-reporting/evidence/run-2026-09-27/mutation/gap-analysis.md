# FR-01 mutation gap analysis — before focused revision

Historical findings; consult [run history](revised-gap-analysis.md) and the AC matrix for subsequent corrections.

The initial completed implementation checkpoint is preserved unchanged: 88 valid
mutants, 56 killed, 14 survived, 18 uncovered, 0 errors, 63.64% detected.
No score threshold applies.

## Meaningful gaps

- **Validation:** one validation string-literal mutant survived; the suite tests
  invalid length and whitespace, but does not explicitly assert every missing
  and unknown category shape. The review also identified missing-category and
  1000-character tests.
- **Ownership:** the direct-ID ownership mutation was detected by the controlled
  seeded-fault test. The mutation report's surviving conditional mutant is not
  proof that the ownership control is absent; it indicates remaining test
  sensitivity around the compound condition. The independent review confirmed
  the current check is present.
- **Error handling:** list and direct-ID storage-error branches are uncovered;
  the suite covers create-save failure but not every read failure. These are
  meaningful gaps because AC5/AC6 depend on safe read behavior.
- **UI/list behavior:** several component mutants are survived or uncovered,
  including submit-state/error microcopy and list rendering paths. The review
  specifically found that newest-first behavior is asserted only by the query
  text in implementation, not by a two-document behavioral test.

Do not add tests merely to improve the percentage. Any additions require a
human decision that they close an acceptance/security gap. The mutation score
and raw statuses remain descriptive evidence only.
