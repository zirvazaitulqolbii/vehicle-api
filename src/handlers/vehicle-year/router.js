import { Router } from 'express';

import { authenticated } from '../../middlewares/authenticated.js';
import { mustAdmin } from '../../middlewares/mustAdmin.js';
import { catchUnhandled } from '../../middlewares/catchUnhandled.js';
import { validateBody, validateParams, validateQuery } from '../../middlewares/validate.js';
import { createVehicleYear, deleteVehicleYear, getVehicleYearById, queryVehicleYears, updateVehicleYear } from './handler.js';
import { createVehicleYearSchema, getVehicleYearByIdSchema, queryVehicleYearSchema, updateVehicleYearSchema } from './schema.js';

export const router = Router();

router.use('/', authenticated)
router.get('/', validateQuery(queryVehicleYearSchema), catchUnhandled(queryVehicleYears));
router.get('/:id', validateParams(getVehicleYearByIdSchema), catchUnhandled(getVehicleYearById));
router.post('/', mustAdmin, validateBody(createVehicleYearSchema), catchUnhandled(createVehicleYear));
router.patch('/:id', mustAdmin, validateParams(getVehicleYearByIdSchema), validateBody(updateVehicleYearSchema), catchUnhandled(updateVehicleYear));
router.delete('/:id', mustAdmin, validateParams(getVehicleYearByIdSchema), catchUnhandled(deleteVehicleYear));


export { router as vehicleYearsRouter }