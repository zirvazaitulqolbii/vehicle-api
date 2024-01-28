import { prisma } from '../../prisma.js'
import { makePaginatedResponse, makeSuccessResponse } from '../../utils.js'

export async function queryVehicleModels(req, res) {
  const conditions = {
    name: {
      contains: req.query.name,
      mode: 'insensitive'
    },
    typeId: req.query.typeId
  }

  const [count, vehicleModels] = await prisma.$transaction(
    [
      prisma.vehicleModel.count({ where: conditions }),
      prisma.vehicleModel.findMany(
        {
          where: conditions,
          skip: req.query.offset,
          take: req.query.limit,
          include: { type: true },
          orderBy: { id: 'asc'  }
        }
      )
    ]
  )

  res.status(200).json(makePaginatedResponse(req.query, vehicleModels, count))
}

export async function getVehicleModelById(req, res) {
  const vehicleModel = await prisma.vehicleModel.findUniqueOrThrow(
    {
      where: {
        id: req.params.id
      }
    }
  )

  res.status(200).json(makeSuccessResponse(vehicleModel))
}

export async function createVehicleModel(req, res) {
  const type = await prisma.vehicleType.findUniqueOrThrow({ where: { id: req.body.typeId } })
  const vehicleModel = await prisma.vehicleModel.create(
    { 
      data: {
         name: req.body.name,
         type: {
          connect: {
            id: type.id
          }
         }
      } 
    }
  )

  res.status(200).json(makeSuccessResponse(vehicleModel))
}

export async function updateVehicleModel(req, res) {
  const model = await prisma.vehicleModel.findUniqueOrThrow({ where: { id: req.params.id } })
  const updated = {
    name: req.body.name || model.name
  }

  if (req.body.typeId) {
    const type = await prisma.vehicleType.findUniqueOrThrow({ where: { id: req.body.typeId } })
    updated.type = {
      connect: {
        id: type.id
      }
    }
  }

  const result = await prisma.vehicleModel.update(
    {
      where: {
        id: req.params.id,
      },
      data: updated
    }
  )

  res.status(200).json(makeSuccessResponse(result))
}

export async function deleteVehicleModel(req, res) {
  try {
    await prisma.vehicleModel.delete(
      {
        where: {
          id: req.params.id
        }
      }
    )
  } catch {
    //
  }
  
  res.status(200).json(makeSuccessResponse(null))
}