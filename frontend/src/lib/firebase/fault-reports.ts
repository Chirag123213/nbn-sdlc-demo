import 'server-only'

import { adminDb } from '@/lib/firebase/admin'

export function getFaultReportsCollection() {
  return adminDb.collection('faultReports')
}
