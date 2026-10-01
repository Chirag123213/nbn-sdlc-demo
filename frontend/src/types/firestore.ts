import type { Timestamp } from 'firebase/firestore'

/**
 * Firestore collection type definitions.
 *
 * Keep in sync with:
 *   - src/lib/firebase/firestore.ts  (typed collection exports)
 *   - firebase/firestore.rules       (security rules)
 *   - docs/FIRESTORE-SCHEMA.md       (schema documentation)
 */

export interface UserProfile {
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
  role: 'user'
  createdAt: Timestamp
  updatedAt: Timestamp
  _schemaVersion: 1
}

export type CreateUserProfileInput = Omit<UserProfile, 'createdAt' | 'updatedAt'>

export type FaultReportCategory = 'no-service' | 'intermittent' | 'slow-speed'
export type FaultReportStatus = 'submitted'

export interface FaultReport {
  uid: string
  category: FaultReportCategory
  description: string
  createdAt: Timestamp
  status: FaultReportStatus
  _schemaVersion: 1
}
