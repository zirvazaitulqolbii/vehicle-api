import { z } from 'zod';
import { paginationSchema } from '../../shared/schema.js';

export const queryPriceListSchema = paginationSchema.extend(
  {
    code: z.string().min(1).optional(),
    yearId: z.coerce.number().positive().optional(),
    modelId: z.coerce.number().positive().optional(),
  }
)

export const getPriceListByIdSchema = z.object(
  {
    id: z.coerce.number().positive(),
  }
)

export const createPriceListSchema = z.object(
  {
    code: z.string().min(1),
    price: z.number().int().positive(),
    yearId: z.number().int().positive(),
    modelId: z.number().int().positive(),
  }
)

export const updatePriceListSchema = z.object(
  {
    code: z.string().min(1).optional(),
    price: z.number().int().positive().optional(),
    yearId: z.number().int().positive().optional(),
    modelId: z.number().int().positive().optional(),
  }
)