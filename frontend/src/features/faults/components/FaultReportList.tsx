import type { FaultReport } from '@/types/firestore'

type FaultReportWithReference = FaultReport & { reference: string }

export function FaultReportList({ reports }: { reports: FaultReportWithReference[] }) {
  if (reports.length === 0) {
    return <p className="text-sm text-zinc-500">No fault reports yet.</p>
  }

  return (
    <ul className="space-y-3">
      {reports.map((report) => (
        <li key={report.reference} className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="font-medium">{report.category}</p>
          <p className="text-xs text-zinc-500">Reference: {report.reference}</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{report.description}</p>
          <p className="mt-2 text-xs text-zinc-500">Status: {report.status}</p>
        </li>
      ))}
    </ul>
  )
}
