import { prisma } from '../../prisma.js'
import { makePaginatedResponse, makeSuccessResponse } from '../../utils.js'

export async function queryVehicleTypes(req, res) {
  const conditions = {
    name: {
      contains: req.query.name,
      mode: 'insensitive'
    },
    brandId: req.query.brandId
  }

  const [count, vehicleTypes] = await prisma.$transaction(
    [
      prisma.vehicleType.count({ where: conditions }),
      prisma.vehicleType.findMany(
        {
          where: conditions,
          skip: req.query.offset,
          take: req.query.limit,
          include: { brand: true },
          orderBy: { id: 'asc'  }
        }
      )
    ]
  )

  res.status(200).json(makePaginatedResponse(req.query, vehicleTypes, count))
}

export async function getVehicleTypeById(req, res) {
  const vehicleType = await prisma.vehicleType.findUniqueOrThrow(
    {
      where: {
        id: req.params.id
      }
    }
  )

  res.status(200).json(makeSuccessResponse(vehicleType))
}

export async function createVehicleType(req, res) {
  const brand = await prisma.vehicleBrand.findUniqueOrThrow({ where: { id: req.body.brandId } })
  const vehicleType = await prisma.vehicleType.create(
    { 
      data: {
         name: req.body.name,
         brand: {
          connect: {
            id: brand.id
          }
         }
      } 
    }
  )

  res.status(200).json(makeSuccessResponse(vehicleType))
}

export async function updateVehicleType(req, res) {
  const type = await prisma.vehicleType.findUniqueOrThrow({ where: { id: req.params.id } })
  const updated = {
    name: req.body.name || type.name
  }

  if (req.body.brandId) {
    const brand = await prisma.vehicleBrand.findUniqueOrThrow({ where: { id: req.body.brandId } })
    updated.brand = {
      connect: {
        id: brand.id
      }
    }
  }

  const result = await prisma.vehicleType.update(
    {
      where: {
        id: type.id
      },
      data: updated,
    }
  )

  res.status(200).json(makeSuccessResponse(result))
}

export async function deleteVehicleType(req, res) {
  try {
    await prisma.vehicleType.delete(
      {
        where: {
          id: Number(req.params.id)
        }
      }
    )
  } catch {
    //
  }

  res.status(200).json(makeSuccessResponse(null))
}