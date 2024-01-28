import { z } from 'zod'
import { paginationSchema } from '../../shared/schema.js'

export const queryVehicleYearSchema = paginationSchema.extend(
  {
    year: z.coerce.number().positive().optional(),
  }
)

export const getVehicleYearByIdSchema = z.object(
  {
    id: z.coerce.number().positive(),
  }
)

export const createVehicleYearSchema = z.object(
  {
    year: z.number().int().positive(),
  }
)

export const updateVehicleYearSchema = z.object(
  {
    year: z.number().int().positive().optional(),
  }
)
