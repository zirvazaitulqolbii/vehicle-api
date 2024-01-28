import { default as express } from 'express';

import { authenticated } from '../../middlewares/authenticated.js';
import { mustAdmin } from '../../middlewares/mustAdmin.js';
import { catchUnhandled } from '../../middlewares/catchUnhandled.js';
import { validateBody, validateParams, validateQuery } from '../../middlewares/validate.js';
import { createVehicleModel, deleteVehicleModel, getVehicleModelById, queryVehicleModels, updateVehicleModel } from './handler.js';
import { createVehicleModelSchema, getVehicleModelByIdSchema, queryVehicleModelSchema, updateVehicleModelSchema } from './schema.js';

const router = express.Router();

router.use('/', authenticated);
router.get('/', validateQuery(queryVehicleModelSchema), catchUnhandled(queryVehicleModels));
router.get('/:id', validateParams(getVehicleModelByIdSchema), catchUnhandled(getVehicleModelById));
router.post('/', mustAdmin, validateBody(createVehicleModelSchema), catchUnhandled(createVehicleModel));
router.patch('/:id', mustAdmin, validateParams(getVehicleModelByIdSchema), validateBody(updateVehicleModelSchema), catchUnhandled(updateVehicleModel));
router.delete('/:id', mustAdmin, validateParams(getVehicleModelByIdSchema), catchUnhandled(deleteVehicleModel));


export { router as vehicleModelsRouter };