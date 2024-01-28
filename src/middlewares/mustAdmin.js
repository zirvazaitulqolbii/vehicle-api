import { prisma } from '../prisma.js'
import { makeErrorResponse } from '../utils.js'

export function mustAdmin(req, res, next) {
  if (!req.auth) throw new Error('auth context not found')
  prisma
    .user
    .findUnique({ where: { id: req.auth.id } })
    .then(
      user => {
        if (!user.isAdmin) {
          return res.status(403).json(makeErrorResponse('You must be an admin to access this resource'))
        }

        next()
      }
    )
    .catch(next)
}