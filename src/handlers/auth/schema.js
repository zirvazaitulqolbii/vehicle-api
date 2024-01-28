import { z } from 'zod'

export const signupSchema = z.object(
  {
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
    isAdmin: z.boolean().optional()
  }
)

export const signinSchema = z.object(
  {
    email: z.string().email(),
    password: z.string()
  }
)