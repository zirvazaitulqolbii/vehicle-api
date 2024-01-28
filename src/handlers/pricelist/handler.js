import { prisma } from '../../prisma.js';
import { makePaginatedResponse, makeSuccessResponse } from '../../utils.js';

export async function queryPriceLists(req, res) {
  const conditions = {
    code: {
      contains: req.query.code,
      mode: 'insensitive'
    },
    modelId: req.query.modelId,
    yearId: req.query.yearId
  }

  const [count, priceLists] = await prisma.$transaction(
    [
      prisma.priceList.count({ where: conditions }),
      prisma.priceList.findMany(
        {
          where: conditions,
          skip: req.query.offset,
          take: req.query.limit,
          include: { model: true, year: true },
          orderBy: { id: 'asc'  }
        }
      )
    ]
  )

  res.status(200).json(makePaginatedResponse(req.query, priceLists, count))
}

export async function getPriceListById(req, res) {
  const priceList = await prisma.priceList.findUniqueOrThrow(
    {
      where: {
        id: req.params.id
      }
    }
  )

  res.status(200).json(makeSuccessResponse(priceList))
}

export async function createPriceList(req, res) {
  const model = await prisma.vehicleModel.findUniqueOrThrow({ where: { id: req.body.modelId } })
  const year = await prisma.vehicleYear.findUniqueOrThrow({ where: { id: req.body.yearId } })
  const priceList = await prisma.priceList.create(
    { 
      data: {
         code: req.body.code,
         price: req.body.price,
         model: {
          connect: {
            id: model.id
          }
         },
         year: {
          connect: {
            id: year.id
          }
         }
      } 
    }
  )

  res.status(200).json(makeSuccessResponse(priceList))
}

export async function updatePriceList(req, res) {
  const price = await prisma.priceList.findUniqueOrThrow({ where: { id: req.params.id } })
  const updated = {
    code: req.body.code || price.code,
    price: req.body.price || price.price,
  }

  if (req.body.modelId) {
    const model = await prisma.vehicleModel.findUniqueOrThrow({ where: { id: req.body.modelId } })
    updated.model = {
      connect: {
        id: model.id
      }
    }
  }

  if (req.body.yearId) {
    const year = await prisma.vehicleYear.findUniqueOrThrow({ where: { id: req.body.yearId } })
    updated.year = {
      connect: {
        id: year.id
      }
    }
  }

  const result = await prisma.priceList.update(
    {
      where: { 
        id: req.params.id 
      },
      data: updated
    }
  )

  res.status(200).json(makeSuccessResponse(result))
}

export async function deletePriceList(req, res) {
  try {
    await prisma.priceList.delete(
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