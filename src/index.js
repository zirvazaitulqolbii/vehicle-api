import { default as express } from 'express'
import { default as dotenv } from 'dotenv'

import { authRouter } from './handlers/auth/router.js'
import { vehicleTypesRouter } from './handlers/vehicle-types/router.js'
import { vehicleBrandsRouter } from './handlers/vehicle-brands/router.js'
import { vehicleModelsRouter } from './handlers/vehicle-models/router.js'
import { vehicleYearsRouter } from './handlers/vehicle-year/router.js'
import { priceListsRouter } from './handlers/pricelist/router.js'
import { usersRouter } from './handlers/user/router.js'
import { makeErrorResponse } from './utils.js'

dotenv.config()

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = express()

app.use(express.json())

app.use('/', authRouter)
app.use('/vehicle-brands', vehicleBrandsRouter)
app.use('/vehicle-types', vehicleTypesRouter)
app.use('/vehicle-models', vehicleModelsRouter)
app.use('/vehicle-years', vehicleYearsRouter)
app.use('/pricelists', priceListsRouter)
app.use('/users', usersRouter)

app.use((err, req, res, next) => {
  console.error(err)
  if (req.headersSent) return next(err)

  if (err.name == 'UnauthorizedError') return res.status(401).json(makeErrorResponse('Unauthorized'))
  if (err.name == 'NotFoundError')  return res.status(404).json(makeErrorResponse(err.message, 'entity_not_found'))
  if (err.name == 'PrismaClientValidationError') return res.status(400).json(makeErrorResponse('Invalid value received', 'validation_error'))
  
  res.json(makeErrorResponse(dev ? err.message : 'Internal server error', 'internal_error'))
})


app.listen(port, () => console.log(`Server running on port ${port}`))