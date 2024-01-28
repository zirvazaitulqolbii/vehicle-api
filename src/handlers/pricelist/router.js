import { Router } from 'express';

import { authenticated } from '../../middlewares/authenticated.js';
import { mustAdmin } from '../../middlewares/mustAdmin.js';
import { catchUnhandled } from '../../middlewares/catchUnhandled.js';
import { validateBody, validateParams, validateQuery } from '../../middlewares/validate.js';
import { createPriceList, deletePriceList, getPriceListById, queryPriceLists, updatePriceList } from './handler.js';
import { createPriceListSchema, getPriceListByIdSchema, queryPriceListSchema, updatePriceListSchema } from './schema.js'

export const router = Router();

router.use('/', authenticated)
router.get('/', validateQuery(queryPriceListSchema), catchUnhandled(queryPriceLists));
router.get('/:id', validateParams(getPriceListByIdSchema), catchUnhandled(getPriceListById));
router.post('/', mustAdmin, validateBody(createPriceListSchema), catchUnhandled(createPriceList));
router.patch('/:id', mustAdmin, validateParams(getPriceListByIdSchema), validateBody(updatePriceListSchema), catchUnhandled(updatePriceList));
router.delete('/:id', mustAdmin, validateParams(getPriceListByIdSchema), catchUnhandled(deletePriceList));


export { router as priceListsRouter }