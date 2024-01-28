import { prisma } from '../../prisma.js';
import { makePaginatedResponse, makeSuccessResponse } from '../../utils.js';

export async function queryVehicleYears(req, res) {
  const conditions = {
    year: req.query.year
  }

  const [count, vehicleYears] = await Promise.all(
    [
      prisma.vehicleYear.count({ where: conditions }),
      prisma.vehicleYear.findMany(
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

  res.status(200).json(makePaginatedResponse(req.query, vehicleYears, count))
}

export async function getVehicleYearById(req, res) {
  const vehicleYear = await prisma.vehicleYear.findUniqueOrThrow(
    {
      where: {
        id: req.params.id
      }
    }
  )

  res.status(200).json(makeSuccessResponse(vehicleYear))
}

export async function createVehicleYear(req, res) {
  const vehicleYear = await prisma.vehicleYear.create(
    {
      data: {
        year: req.body.year
      }
    }
  )

  res.status(200).json(makeSuccessResponse(vehicleYear))
}

export async function updateVehicleYear(req, res) {
  const vehicleYear = await prisma.vehicleYear.findUniqueOrThrow({ where: { id: req.params.id } })
  const result = await prisma.vehicleYear.update(
    {
      where: {
        id: vehicleYear.id
      },
      data: {
        year: req.body.year || vehicleYear.year
      }
    }
  )

  res.status(200).json(makeSuccessResponse(result))
}

export async function deleteVehicleYear(req, res) {
  try {
    await prisma.vehicleYear.delete(
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