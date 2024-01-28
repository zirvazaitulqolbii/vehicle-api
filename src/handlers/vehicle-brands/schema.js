import { z } from 'zod'
import { paginationSchema } from '../../shared/schema.js'

export const queryVehicleBrandSchema = paginationSchema.extend(
  {
    name: z.string().min(1).optional(),
  }
)

export const getVehicleBrandByIdSchema = z.object(
  {
    id: z.coerce.number().positive(),
  }
)

export const createVehicleBrandSchema = z.object(
  {
    name: z.string().min(1),
  }
)

export const updateVehicleBrandSchema = z.object(
  {
    name: z.string().min(1).optional(),
  }
)