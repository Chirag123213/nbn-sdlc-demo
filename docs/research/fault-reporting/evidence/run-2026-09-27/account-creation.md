# FR-01 synthetic Firebase accounts

Creation was authorized by Zafir Hasan on 27 September 2026. No accounts were
created during this readiness pass because the local Firebase configuration is
not present (`.env`, `frontend/.env.local`, and `backend/.env` are absent).
No existing users were inspected or modified.

Reserved test identities:

| Label | Firebase UID | Email | Status |
|---|---|---|---|
| User A | withheld | withheld | Not created |
| User B | withheld | withheld | Not created |

When configuration is available, create both accounts through the existing
sign-up flow where possible, using synthetic email addresses and passwords
handled locally. Do not place passwords, tokens, full email addresses, or UID
values in chat, logs, committed files, or evidence. Record only User A/User B
and creation success, then retain the accounts through testing and independent
review. Cleanup requires a separate explicit decision after review.
