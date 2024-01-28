import { default as express } from 'express';

import { validateBody } from '../../middlewares/validate.js'
import { signin, signup } from './handler.js'
import { signinSchema, signupSchema } from './schema.js'
import { catchUnhandled } from '../../middlewares/catchUnhandled.js'


const router = express.Router();

router.post('/sign-up', validateBody(signupSchema), catchUnhandled(signup));
router.post('/sign-in', validateBody(signinSchema), catchUnhandled(signin));

export { router as authRouter }