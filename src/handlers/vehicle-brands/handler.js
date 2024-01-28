import { prisma } from '../../prisma.js'
import { makePaginatedResponse, makeSuccessResponse } from '../../utils.js'

export async function queryVehicleBrands(req, res) {
  const conditions = {
    name: {
      contains: req.query.name,
      mode: 'insensitive'
    }
  }

  const [count, vehicleBrands] = await prisma.$transaction(
    [
      prisma.vehicleBrand.count({ where: conditions }),
      prisma.vehicleBrand.findMany(
        {
          where: conditions,
          skip: req.query.offset,
          take: req.query.limit,
          orderBy: {
            id: 'asc'
          }
        }
      )
    ]
  )

  res.status(200).json(makePaginatedResponse(req.query, vehicleBrands, count))
}

export async function getVehicleBrandById(req, res) {
  const vehicleBrand = await prisma.vehicleBrand.findUniqueOrThrow(
    {
      where: {
        id: req.params.id
      }
    }
  )


  res.status(200).json(makeSuccessResponse(vehicleBrand))
}

export async function createVehicleBrand(req, res) {
  const vehicleBrand = await prisma.vehicleBrand.create(
    { 
      data: {
         name: req.body.name,
      } 
    }
  )

  res.status(200).json(makeSuccessResponse(vehicleBrand))
}


export async function updateVehicleBrand(req, res) {
  const brand = await prisma.vehicleBrand.findUniqueOrThrow({ where: { id: req.params.id } })
  const vehicleBrand = await prisma.vehicleBrand.update(
    {
      where: {
        id: brand.id,
      },
      data: {
        name: req.body.name,
      }
    }
  )

  res.status(200).json(makeSuccessResponse(vehicleBrand))
}

export async function deleteVehicleBrand(req, res) {
  try {
    await prisma.vehicleBrand.delete(
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