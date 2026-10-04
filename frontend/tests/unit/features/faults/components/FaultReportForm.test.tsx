import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FaultReportForm } from '@/features/faults/components/FaultReportForm'
import { createFaultReport } from '@/actions/faults.actions'

vi.mock('@/actions/faults.actions', () => ({
  createFaultReport: vi.fn(),
}))

const createFaultReportMock = vi.mocked(createFaultReport)

describe('FaultReportForm', () => {
  it('renders the approved category and description controls', () => {
    render(<FaultReportForm />)

    expect(screen.getByLabelText('Category')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toHaveAttribute('minLength', '10')
    expect(screen.getByRole('button', { name: 'Submit fault' })).toBeInTheDocument()
  })

  it('shows the reference only after a successful save', async () => {
    createFaultReportMock.mockResolvedValueOnce({ success: true, data: { reference: 'report-123' } })
    const user = userEvent.setup()
    render(<FaultReportForm />)

    await user.type(screen.getByLabelText('Description'), 'Service is unavailable')
    await user.click(screen.getByRole('button', { name: 'Submit fault' }))

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('report-123'))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows a save error without a false success confirmation', async () => {
    createFaultReportMock.mockResolvedValueOnce({ success: false, error: 'Save failed' })
    const user = userEvent.setup()
    render(<FaultReportForm />)

    await user.type(screen.getByLabelText('Description'), 'Service is unavailable')
    await user.click(screen.getByRole('button', { name: 'Submit fault' }))

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Save failed'))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
