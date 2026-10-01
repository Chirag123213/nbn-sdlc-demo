'use server'

import { FieldValue } from 'firebase-admin/firestore'
import { requireAuth } from '@/actions/auth.actions'
import { getFaultReportsCollection } from '@/lib/firebase/fault-reports'
import { createFaultReportSchema } from '@/lib/validations/faults'
import type { ActionResult } from '@/types'
import type { FaultReport } from '@/types/firestore'

type FaultReportWithReference = FaultReport & { reference: string }

const REPORT_NOT_FOUND_ERROR = 'Fault report not found'

export async function createFaultReport(input: unknown): Promise<ActionResult<{ reference: string }>> {
  const session = await requireAuth()
  const parsed = createFaultReportSchema.safeParse(input)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid fault report' }
  }

  try {
    const reportRef = getFaultReportsCollection().doc()
    await reportRef.set({
      uid: session.uid,
      category: parsed.data.category,
      description: parsed.data.description,
      createdAt: FieldValue.serverTimestamp(),
      status: 'submitted',
      _schemaVersion: 1,
    })

    return { success: true, data: { reference: reportRef.id } }
  } catch {
    return { success: false, error: 'Failed to save fault report. Please try again.' }
  }
}

export async function listFaultReports(): Promise<ActionResult<FaultReportWithReference[]>> {
  const session = await requireAuth()

  try {
    const snapshot = await getFaultReportsCollection()
      .where('uid', '==', session.uid)
      .orderBy('createdAt', 'desc')
      .get()

    return {
      success: true,
      data: snapshot.docs.map((document) => ({
        reference: document.id,
        ...(document.data() as FaultReport),
      })),
    }
  } catch {
    return { success: false, error: 'Failed to load fault reports. Please try again.' }
  }
}

export async function getFaultReport(reference: string): Promise<ActionResult<FaultReportWithReference>> {
  const session = await requireAuth()

  try {
    const document = await getFaultReportsCollection().doc(reference).get()
    const report = document.exists ? (document.data() as FaultReport | undefined) : undefined

    if (!report || report.uid !== session.uid) {
      return { success: false, error: REPORT_NOT_FOUND_ERROR }
    }

    return { success: true, data: { reference, ...report } }
  } catch {
    return { success: false, error: REPORT_NOT_FOUND_ERROR }
  }
}
