import type { FaultReport, FaultReportCategory } from '@/types/firestore'

export type { FaultReport, FaultReportCategory }

export interface CreateFaultReportInput {
  category: FaultReportCategory
  description: string
}
