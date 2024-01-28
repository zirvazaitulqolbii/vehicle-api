import { default as express } from 'express'

import { authenticated } from '../../middlewares/authenticated.js'
import { mustAdmin } from '../../middlewares/mustAdmin.js'
import { catchUnhandled } from '../../middlewares/catchUnhandled.js'
import { validateBody, validateParams, validateQuery } from '../../middlewares/validate.js'
import { createVehicleType, deleteVehicleType, getVehicleTypeById, queryVehicleTypes, updateVehicleType } from './handler.js'
import { createVehicleTypeSchema, getVehicleTypeByIdSchema, queryVehicleTypesSchema, updateVehicleTypeSchema } from './schema.js'

export const router = express.Router();

router.use('/', authenticated)
router.get('/', validateQuery(queryVehicleTypesSchema), catchUnhandled(queryVehicleTypes));
router.get('/:id', validateParams(getVehicleTypeByIdSchema), catchUnhandled(getVehicleTypeById));
router.post('/', mustAdmin, validateBody(createVehicleTypeSchema), catchUnhandled(createVehicleType));
router.patch('/:id', mustAdmin, validateParams(getVehicleTypeByIdSchema), validateBody(updateVehicleTypeSchema), catchUnhandled(updateVehicleType));
router.delete('/:id', mustAdmin, validateParams(getVehicleTypeByIdSchema), catchUnhandled(deleteVehicleType));


export { router as vehicleTypesRouter }