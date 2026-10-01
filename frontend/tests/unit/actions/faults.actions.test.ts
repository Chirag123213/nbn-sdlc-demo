import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createFaultReport, getFaultReport, listFaultReports } from '@/actions/faults.actions'
import { requireAuth } from '@/actions/auth.actions'
import { getFaultReportsCollection } from '@/lib/firebase/fault-reports'

vi.mock('@/actions/auth.actions', () => ({ requireAuth: vi.fn() }))
vi.mock('@/lib/firebase/fault-reports', () => ({ getFaultReportsCollection: vi.fn() }))

type ReportDoc = { id: string; data: () => unknown; exists: boolean }

const set = vi.fn()
const get = vi.fn()
const doc = vi.fn(() => ({ id: 'report-123', set, get }))
const orderBy = vi.fn(() => ({ get }))
const where = vi.fn(() => ({ orderBy }))
const collection = { doc, where }

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(requireAuth).mockResolvedValue({ uid: 'owner-a' } as never)
  vi.mocked(getFaultReportsCollection).mockReturnValue(collection as never)
  get.mockResolvedValue({ docs: [] })
})

describe('createFaultReport', () => {
  it.each([
    ['missing category', { description: 'service is unavailable' }],
    ['unknown category', { category: 'billing', description: 'service is unavailable' }],
    ['missing description', { category: 'no-service' }],
  ])('rejects %s without writing', async (_case, input) => {
    const result = await createFaultReport(input)

    expect(result.success).toBe(false)
    expect(set).not.toHaveBeenCalled()
  })

  it.each([9, 1001])('rejects a description of %i characters without writing', async (length) => {
    const result = await createFaultReport({ category: 'no-service', description: 'x'.repeat(length) })

    expect(result.success).toBe(false)
    expect(set).not.toHaveBeenCalled()
  })

  it('accepts exactly 1000 trimmed characters', async () => {
    const result = await createFaultReport({ category: 'slow-speed', description: `  ${'x'.repeat(1000)}  ` })

    expect(result).toEqual({ success: true, data: { reference: 'report-123' } })
    expect(set).toHaveBeenCalledWith(expect.objectContaining({
      uid: 'owner-a',
      category: 'slow-speed',
      description: 'x'.repeat(1000),
      status: 'submitted',
      _schemaVersion: 1,
    }))
  })

  it('rejects blank descriptions and unknown fields without writing', async () => {
    const result = await createFaultReport({ category: 'no-service', description: '          ', uid: 'owner-b', status: 'approved' })

    expect(result.success).toBe(false)
    expect(set).not.toHaveBeenCalled()
  })

  it('returns a useful error when storage fails', async () => {
    set.mockRejectedValueOnce(new Error('storage unavailable'))

    const result = await createFaultReport({ category: 'intermittent', description: 'connection drops often' })

    expect(result).toEqual({ success: false, error: 'Failed to save fault report. Please try again.' })
  })

  it('does not swallow authentication redirects/errors', async () => {
    const authError = new Error('redirect')
    vi.mocked(requireAuth).mockRejectedValueOnce(authError)

    await expect(createFaultReport({ category: 'no-service', description: 'service is unavailable' })).rejects.toThrow(authError)
    expect(set).not.toHaveBeenCalled()
  })
})

describe('fault report reads', () => {
  const report = {
    uid: 'owner-a',
    category: 'no-service',
    description: 'service is unavailable',
    createdAt: { toMillis: () => 1 },
    status: 'submitted',
    _schemaVersion: 1,
  }

  it('uses the authenticated owner filter and descending createdAt query contract', async () => {
    const orderedGet = vi.fn().mockResolvedValue({
      docs: [
        { id: 'newer', data: () => ({ ...report, description: 'newer report' }) } as ReportDoc,
        { id: 'older', data: () => ({ ...report, description: 'older report' }) } as ReportDoc,
      ],
    })
    orderBy.mockReturnValueOnce({ get: orderedGet })

    const result = await listFaultReports()

    expect(where).toHaveBeenCalledWith('uid', '==', 'owner-a')
    expect(orderBy).toHaveBeenCalledWith('createdAt', 'desc')
    expect(result).toEqual({
      success: true,
      data: [
        { reference: 'newer', ...report, description: 'newer report' },
        { reference: 'older', ...report, description: 'older report' },
      ],
    })
  })

  it('returns a safe error when listing fails', async () => {
    orderBy.mockReturnValueOnce({ get: vi.fn().mockRejectedValue(new Error('index unavailable')) })

    await expect(listFaultReports()).resolves.toEqual({ success: false, error: 'Failed to load fault reports. Please try again.' })
  })

  it('preserves authentication redirects for listing', async () => {
    const authError = new Error('redirect')
    vi.mocked(requireAuth).mockRejectedValueOnce(authError)

    await expect(listFaultReports()).rejects.toThrow(authError)
  })

  it('returns the same safe result for missing and non-owned IDs', async () => {
    get.mockResolvedValueOnce({ exists: false, data: () => undefined })
    await expect(getFaultReport('missing')).resolves.toEqual({ success: false, error: 'Fault report not found' })

    get.mockResolvedValueOnce({ exists: true, data: () => ({ ...report, uid: 'owner-b' }) })
    await expect(getFaultReport('other-user')).resolves.toEqual({ success: false, error: 'Fault report not found' })
  })

  it('returns a safe error when direct-ID storage fails', async () => {
    get.mockRejectedValueOnce(new Error('storage unavailable'))

    await expect(getFaultReport('report-123')).resolves.toEqual({ success: false, error: 'Fault report not found' })
  })

  it('preserves authentication redirects for direct-ID reads', async () => {
    const authError = new Error('redirect')
    vi.mocked(requireAuth).mockRejectedValueOnce(authError)

    await expect(getFaultReport('report-123')).rejects.toThrow(authError)
  })
})
