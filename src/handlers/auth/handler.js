import { hash, compare } from 'bcrypt'
import { default as jwt } from 'jsonwebtoken'

import { prisma } from '../../prisma.js'
import { makeErrorResponse, makeSuccessResponse } from '../../utils.js'

function generateToken(user) {
  return jwt.sign({ id: user.id }, process.env.SECRET, {  algorithm: 'HS256' })
}

export async function signup(req, res) {
  const {
    email,
    name,
    password,
    isAdmin
  } = req.body

  const emailExists = await prisma.credential.findUnique({ where: { email } })
  if (emailExists) {
    return res.status(400).json(makeErrorResponse('Email already exists'))
  }

  const user = await prisma.user.create(
    {
      data: {
        name, 
        isAdmin,
        credential: {
          create: {
            email,
            password: await hash(password, 10)
          }
        }
      }
    }
  )

  const token = generateToken(user)
  const response = makeSuccessResponse({ user: { ...user, email }, token })

  res.status(200).json(response)
}

export async function signin(req, res) {
  const credential = await prisma.credential.findUnique({ where: { email: req.body.email } })
  
  let validCredentials = !!credential
  if (credential) {
    validCredentials = await compare(req.body.password, credential.password)
  }

  if (!validCredentials) {
    return res.status(400).json(makeErrorResponse('Invalid email or password'))
  }

  const user = await prisma.user.findUnique({ where: { id: credential.userId } })
  const token = generateToken(user)
  const response = makeSuccessResponse({ user: { ...user, email: req.body.email }, token })

  res.status(200).json(response)
}