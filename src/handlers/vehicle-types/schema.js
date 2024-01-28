import { z } from 'zod'
import { paginationSchema } from '../../shared/schema.js'

export const queryVehicleTypesSchema = paginationSchema.extend(
  {
    name: z.string().min(1).optional(),
    brandId: z.coerce.number().positive().optional(),
  }
)

export const getVehicleTypeByIdSchema = z.object(
  {
    id: z.coerce.number().positive(),
  }
)

export const updateVehicleTypeSchema = z.object(
  {
    name: z.string().min(1).optional(),
    brandId: z.number().int().positive().optional(),
  }
)

export const createVehicleTypeSchema = z.object(
  {
    name: z.string().min(1),
    brandId: z.number().int().positive(),
  }
)
