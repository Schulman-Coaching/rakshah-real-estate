import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const listingType = searchParams.get('listingType')
    const propertyType = searchParams.get('propertyType')
    const neighborhood = searchParams.get('neighborhood')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const minRooms = searchParams.get('minRooms')
    const maxRooms = searchParams.get('maxRooms')
    const minSize = searchParams.get('minSize')
    const maxSize = searchParams.get('maxSize')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Features
    const parking = searchParams.get('parking') === 'true'
    const elevator = searchParams.get('elevator') === 'true'
    const mamad = searchParams.get('mamad') === 'true'
    const sukka = searchParams.get('sukka') === 'true'
    const storage = searchParams.get('storage') === 'true'
    const airConditioning = searchParams.get('airConditioning') === 'true'
    const garden = searchParams.get('garden') === 'true'
    const shabbatElevator = searchParams.get('shabbatElevator') === 'true'

    // Build where clause
    const where: Record<string, unknown> = {
      status: 'ACTIVE',
    }

    if (listingType) {
      where.listingType = listingType
    }

    if (propertyType) {
      where.propertyType = propertyType
    }

    if (neighborhood) {
      where.neighborhood = neighborhood
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) (where.price as Record<string, number>).gte = parseFloat(minPrice)
      if (maxPrice) (where.price as Record<string, number>).lte = parseFloat(maxPrice)
    }

    if (minRooms || maxRooms) {
      where.rooms = {}
      if (minRooms) (where.rooms as Record<string, number>).gte = parseFloat(minRooms)
      if (maxRooms) (where.rooms as Record<string, number>).lte = parseFloat(maxRooms)
    }

    if (minSize || maxSize) {
      where.sizeSqm = {}
      if (minSize) (where.sizeSqm as Record<string, number>).gte = parseFloat(minSize)
      if (maxSize) (where.sizeSqm as Record<string, number>).lte = parseFloat(maxSize)
    }

    // Feature filters
    if (parking) where.parking = { gte: 1 }
    if (elevator) where.elevator = true
    if (mamad) where.mamad = true
    if (sukka) where.sukka = true
    if (storage) where.storage = true
    if (airConditioning) where.airConditioning = true
    if (garden) where.garden = true
    if (shabbatElevator) where.shabbatElevator = true

    // Get total count
    const total = await prisma.property.count({ where })

    // Get properties
    const properties = await prisma.property.findMany({
      where,
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 5,
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const property = await prisma.property.create({
      data: {
        ...body,
        images: body.images ? {
          create: body.images,
        } : undefined,
      },
      include: {
        images: true,
      },
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}
