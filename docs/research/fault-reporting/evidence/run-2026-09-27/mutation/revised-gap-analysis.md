# Revised mutation comparison

Same frontend scope, Stryker version, Vitest runner, and configuration as the
first measurement.

| Measurement | Valid | Killed | Survived | Uncovered | Errors | Detected |
|---|---:|---:|---:|---:|---:|---:|
| First post-implementation | 88 | 56 | 14 | 18 | 0 | 63.64% |
| After focused test revision | 88 | 65 | 12 | 11 | 0 | 73.86% |

Detected percentage is descriptive: `(killed + timeout) / (valid - errors)`.
No threshold applies. The improvement reflects tests addressing real AC2,
AC4, AC5 and AC6 gaps, not score targeting. Remaining survivors/uncovered
mutants are preserved in the revised raw report; live Firestore behavior,
composite indexes, rules enforcement, refresh persistence, and deployment remain
outside this mocked local measurement.
