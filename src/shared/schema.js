import { z } from 'zod'

export const paginationSchema = z.object(
  {
    limit: z.coerce.number().positive().optional().default(20),
    offset: z.coerce.number().optional().default(0),
  }
)