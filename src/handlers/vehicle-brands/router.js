import { default as express } from 'express';

import { authenticated } from '../../middlewares/authenticated.js';
import { mustAdmin } from '../../middlewares/mustAdmin.js';
import { catchUnhandled } from '../../middlewares/catchUnhandled.js';
import { validateBody, validateParams, validateQuery } from '../../middlewares/validate.js';
import { createVehicleBrand, deleteVehicleBrand, getVehicleBrandById, queryVehicleBrands, updateVehicleBrand } from './handler.js';
import { createVehicleBrandSchema, getVehicleBrandByIdSchema, queryVehicleBrandSchema, updateVehicleBrandSchema } from './schema.js';

const router = express.Router();

router.use('/', authenticated);
router.get('/', validateQuery(queryVehicleBrandSchema), catchUnhandled(queryVehicleBrands));
router.get('/:id', validateParams(getVehicleBrandByIdSchema), catchUnhandled(getVehicleBrandById));
router.post('/', mustAdmin, validateBody(createVehicleBrandSchema), catchUnhandled(createVehicleBrand));
router.patch('/:id', mustAdmin, validateParams(getVehicleBrandByIdSchema), validateBody(updateVehicleBrandSchema), catchUnhandled(updateVehicleBrand));
router.delete('/:id', mustAdmin, validateParams(getVehicleBrandByIdSchema), catchUnhandled(deleteVehicleBrand));


export { router as vehicleBrandsRouter };