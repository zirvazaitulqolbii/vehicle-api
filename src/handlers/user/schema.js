import { z } from 'zod'
import { paginationSchema } from '../../shared/schema.js'

export const queryUserSchema = paginationSchema.extend(
  {
    name: z.string().min(1).optional(),
  }
)

export const getUserByIdSchema = z.object(
  {
    id: z.coerce.number().positive(),
  }
)

export const updateUserSchema = z.object(
  {
    name: z.string().min(1).optional(),
    isAdmin: z.boolean().optional(),
  }
)