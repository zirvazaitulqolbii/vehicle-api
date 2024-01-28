import { prisma } from '../../prisma.js'
import { makePaginatedResponse, makeSuccessResponse } from '../../utils.js'

export async function queryUsers(req, res) {
  const conditions = {
    name: {
      contains: req.query.name || '',
      mode: 'insensitive',
    },
    isAdmin: req.query.isAdmin,
  }

  const [count, users] = await prisma.$transaction([
    prisma.user.count({ where: conditions }),
    prisma.user.findMany(
        {
        where: conditions,
        skip: req.query.offset,
        take: req.query.limit,
        orderBy: {
          id: 'asc',
        },
      }
    ),
  ])

  res.status(200).json(makePaginatedResponse(req.query, users, count))
}

export async function getUserById(req, res) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: req.params.id,
    },
  })

  res.status(200).json(makeSuccessResponse(user))
}

export async function updateUser(req, res) {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: req.params.id } })
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: req.body.name,
      isAdmin: req.body.isAdmin,
    },
  })

  res.status(200).json(makeSuccessResponse(updatedUser))
}

export async function deleteUser(req, res) {
  try {
    await prisma.user.delete({ where: { id: req.params.id } })
  } catch {
    //
  }

  res.status(200).json(makeSuccessResponse(null))
}