import { Router } from 'express';

import { authenticated } from '../../middlewares/authenticated.js';
import { mustAdmin } from '../../middlewares/mustAdmin.js';
import { catchUnhandled } from '../../middlewares/catchUnhandled.js';
import { validateBody, validateParams, validateQuery } from '../../middlewares/validate.js';
import { deleteUser, getUserById, queryUsers, updateUser } from './handler.js';
import { getUserByIdSchema, queryUserSchema, updateUserSchema } from './schema.js'

const router = Router();

router.use('/', authenticated);
router.get('/', validateQuery(queryUserSchema), catchUnhandled(queryUsers));
router.get('/:id', validateParams(getUserByIdSchema), catchUnhandled(getUserById));
router.patch('/:id', mustAdmin, validateParams(getUserByIdSchema), validateBody(updateUserSchema), catchUnhandled(updateUser));
router.delete('/:id', mustAdmin, validateParams(getUserByIdSchema), catchUnhandled(deleteUser));

export { router as usersRouter };