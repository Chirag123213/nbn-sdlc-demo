'use client'

import { useState, useTransition } from 'react'
import { createFaultReport } from '@/actions/faults.actions'

export function FaultReportForm() {
  const [error, setError] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function submit(formData: FormData) {
    setError(null)
    setReference(null)
    startTransition(async () => {
      const result = await createFaultReport({
        category: formData.get('category'),
        description: formData.get('description'),
      })

      if (!result.success) {
        setError(result.error ?? 'Failed to save fault report. Please try again.')
        return
      }

      setReference(result.data?.reference ?? null)
    })
  }

  return (
    <form action={submit} className="space-y-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <label htmlFor="category" className="block text-sm font-medium">
          Category
        </label>
        <select id="category" name="category" required className="mt-1 block w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700">
          <option value="no-service">No service</option>
          <option value="intermittent">Intermittent</option>
          <option value="slow-speed">Slow speed</option>
        </select>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea id="description" name="description" required minLength={10} maxLength={1000} rows={5} className="mt-1 block w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700" />
      </div>
      <button type="submit" disabled={isPending} className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-zinc-900">
        {isPending ? 'Submitting…' : 'Submit fault'}
      </button>
      {reference && <p role="status" className="text-sm text-green-700">Fault report submitted. Reference: {reference}</p>}
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </form>
  )
}
