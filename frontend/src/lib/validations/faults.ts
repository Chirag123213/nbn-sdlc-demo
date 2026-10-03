import { z } from 'zod'

export const faultReportCategorySchema = z.enum(['no-service', 'intermittent', 'slow-speed'])

export const createFaultReportSchema = z
  .object({
    category: faultReportCategorySchema,
    description: z.string().trim().min(10).max(1000),
  })
  .strict()

export type CreateFaultReportInput = z.infer<typeof createFaultReportSchema>
