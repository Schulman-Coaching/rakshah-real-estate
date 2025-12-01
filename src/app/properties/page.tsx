import { Suspense } from 'react'
import { prisma } from '@/lib/db'
import { PropertyFilters } from '@/components/properties/PropertyFilters'
import { PropertyGrid } from '@/components/properties/PropertyGrid'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface SearchParams {
  listingType?: string
  propertyType?: string
  neighborhood?: string
  minPrice?: string
  maxPrice?: string
  minRooms?: string
  maxRooms?: string
  minSize?: string
  maxSize?: string
  parking?: string
  elevator?: string
  mamad?: string
  sukka?: string
  shabbatElevator?: string
  airConditioning?: string
  page?: string
  sortBy?: string
  sortOrder?: string
}

async function getProperties(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const sortBy = searchParams.sortBy || 'createdAt'
  const sortOrder = searchParams.sortOrder || 'desc'

  // Build where clause
  const where: Record<string, unknown> = {
    status: 'ACTIVE',
  }

  if (searchParams.listingType) {
    where.listingType = searchParams.listingType
  }

  if (searchParams.propertyType) {
    where.propertyType = searchParams.propertyType
  }

  if (searchParams.neighborhood) {
    where.neighborhood = searchParams.neighborhood
  }

  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {}
    if (searchParams.minPrice) (where.price as Record<string, number>).gte = parseFloat(searchParams.minPrice)
    if (searchParams.maxPrice) (where.price as Record<string, number>).lte = parseFloat(searchParams.maxPrice)
  }

  if (searchParams.minRooms || searchParams.maxRooms) {
    where.rooms = {}
    if (searchParams.minRooms) (where.rooms as Record<string, number>).gte = parseFloat(searchParams.minRooms)
    if (searchParams.maxRooms) (where.rooms as Record<string, number>).lte = parseFloat(searchParams.maxRooms)
  }

  if (searchParams.minSize || searchParams.maxSize) {
    where.sizeSqm = {}
    if (searchParams.minSize) (where.sizeSqm as Record<string, number>).gte = parseFloat(searchParams.minSize)
    if (searchParams.maxSize) (where.sizeSqm as Record<string, number>).lte = parseFloat(searchParams.maxSize)
  }

  // Feature filters
  if (searchParams.parking === 'true') where.parking = { gte: 1 }
  if (searchParams.elevator === 'true') where.elevator = true
  if (searchParams.mamad === 'true') where.mamad = true
  if (searchParams.sukka === 'true') where.sukka = true
  if (searchParams.shabbatElevator === 'true') where.shabbatElevator = true
  if (searchParams.airConditioning === 'true') where.airConditioning = true

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
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
    }),
    prisma.property.count({ where }),
  ])

  return {
    properties,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

function buildPaginationUrl(searchParams: SearchParams, page: number) {
  const params = new URLSearchParams()
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value && key !== 'page') {
      params.set(key, value)
    }
  })
  params.set('page', String(page))
  return `/properties?${params.toString()}`
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { properties, pagination } = await getProperties(searchParams)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Properties in Beit Shemesh</h1>
          <p className="text-teal-100">
            Find your perfect home in Ramat Beit Shemesh and Greater Beit Shemesh
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Suspense fallback={<div className="h-24 bg-white rounded-lg animate-pulse" />}>
          <PropertyFilters />
        </Suspense>

        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {pagination.total} {pagination.total === 1 ? 'property' : 'properties'} found
          </p>
          <select
            className="border rounded-md px-3 py-2 text-sm"
            defaultValue={`${searchParams.sortBy || 'createdAt'}-${searchParams.sortOrder || 'desc'}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-')
              const params = new URLSearchParams(window.location.search)
              params.set('sortBy', sortBy)
              params.set('sortOrder', sortOrder)
              window.location.href = `/properties?${params.toString()}`
            }}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="sizeSqm-desc">Size: Large to Small</option>
            <option value="sizeSqm-asc">Size: Small to Large</option>
          </select>
        </div>

        {/* Property Grid */}
        <PropertyGrid properties={properties} />

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {pagination.page > 1 && (
              <Link href={buildPaginationUrl(searchParams, pagination.page - 1)}>
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
              </Link>
            )}

            <div className="flex items-center gap-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(p => {
                  // Show first, last, current, and pages around current
                  return (
                    p === 1 ||
                    p === pagination.totalPages ||
                    Math.abs(p - pagination.page) <= 2
                  )
                })
                .map((p, idx, arr) => {
                  // Add ellipsis between gaps
                  const showEllipsisBefore = idx > 0 && arr[idx - 1] !== p - 1
                  return (
                    <span key={p} className="flex items-center">
                      {showEllipsisBefore && <span className="px-2 text-gray-400">...</span>}
                      <Link href={buildPaginationUrl(searchParams, p)}>
                        <Button
                          variant={p === pagination.page ? 'default' : 'outline'}
                          size="sm"
                          className="min-w-[40px]"
                        >
                          {p}
                        </Button>
                      </Link>
                    </span>
                  )
                })}
            </div>

            {pagination.page < pagination.totalPages && (
              <Link href={buildPaginationUrl(searchParams, pagination.page + 1)}>
                <Button variant="outline" size="sm">
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
