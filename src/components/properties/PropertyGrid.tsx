'use client'

import { PropertyCard } from './PropertyCard'

interface PropertyImage {
  id: string
  url: string
  caption?: string | null
  isPrimary: boolean
}

interface Property {
  id: string
  title: string
  titleHe?: string | null
  slug: string
  listingType: string
  propertyType: string
  neighborhood: string
  address: string
  price: number
  sizeSqm: number
  rooms: number
  bedrooms: number
  bathrooms: number
  parking: number
  mamad: boolean
  elevator: boolean
  airConditioning: boolean
  images: PropertyImage[]
}

interface PropertyGridProps {
  properties: Property[]
  lang?: 'en' | 'he'
}

export function PropertyGrid({ properties, lang = 'en' }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          No properties found
        </h3>
        <p className="text-gray-500">
          Try adjusting your search filters to find more results.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} lang={lang} />
      ))}
    </div>
  )
}
