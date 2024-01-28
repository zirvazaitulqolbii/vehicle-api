import { z } from 'zod'
import { paginationSchema } from '../../shared/schema.js'

export const queryVehicleModelSchema = paginationSchema.extend(
  {
    name: z.string().min(1).optional(),
    typeId: z.coerce.number().positive().optional(),
  }
)

export const getVehicleModelByIdSchema = z.object(
  {
    id: z.coerce.number().positive(),
  }
)

export const createVehicleModelSchema = z.object(
  {
    name: z.string().min(1),
    typeId: z.number().int().positive(),
  }
)

export const updateVehicleModelSchema = z.object(
  {
    name: z.string().min(1).optional(),
    typeId: z.number().int().positive().optional(),
  }
)