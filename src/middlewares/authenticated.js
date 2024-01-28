import { expressjwt } from 'express-jwt'

export const authenticated = expressjwt(
  {
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    ignoreExpiration: true,
  }
)