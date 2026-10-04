import type { Metadata } from 'next'
import { listFaultReports } from '@/actions/faults.actions'
import { FaultReportForm } from '@/features/faults/components/FaultReportForm'
import { FaultReportList } from '@/features/faults/components/FaultReportList'

export const metadata: Metadata = { title: 'Fault reports' }

export default async function FaultsPage() {
  const result = await listFaultReports()

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Report a fault</h1>
        <p className="mt-1 text-sm text-zinc-500">Submit a service issue and keep a reference for it.</p>
      </div>
      <FaultReportForm />
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your reports</h2>
        {result.success ? <FaultReportList reports={result.data ?? []} /> : <p role="alert" className="text-sm text-red-600">{result.error}</p>}
      </section>
    </div>
  )
}
