'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  Car,
  Shield,
  Wind,
  Heart,
  Building2
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  NEIGHBORHOOD_NAMES,
  PROPERTY_TYPE_NAMES,
  LISTING_TYPE_NAMES,
  formatPrice,
  formatArea
} from '@/lib/constants'

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

interface PropertyCardProps {
  property: Property
  lang?: 'en' | 'he'
}

export function PropertyCard({ property, lang = 'en' }: PropertyCardProps) {
  const neighborhoodName = NEIGHBORHOOD_NAMES[property.neighborhood]?.[lang] || property.neighborhood
  const propertyTypeName = PROPERTY_TYPE_NAMES[property.propertyType]?.[lang] || property.propertyType
  const listingTypeName = LISTING_TYPE_NAMES[property.listingType]?.[lang] || property.listingType

  const primaryImage = property.images.find(img => img.isPrimary) || property.images[0]
  const imageUrl = primaryImage?.url || '/placeholder-property.jpg'

  const title = lang === 'he' && property.titleHe ? property.titleHe : property.title

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={`/properties/${property.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              property.listingType === 'SALE'
                ? 'bg-teal-600 text-white'
                : property.listingType === 'RENT'
                ? 'bg-blue-600 text-white'
                : 'bg-purple-600 text-white'
            }`}>
              {listingTypeName}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full"
            onClick={(e) => {
              e.preventDefault()
              // TODO: Add to saved
            }}
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-2xl font-bold text-teal-600">
            {formatPrice(property.price, property.listingType)}
          </p>
        </div>

        <Link href={`/properties/${property.slug}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-teal-600 line-clamp-1">
            {title}
          </h3>
        </Link>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{neighborhoodName}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" />
            <span>{property.rooms} rooms</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="h-4 w-4" />
            <span>{formatArea(property.sizeSqm)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {propertyTypeName}
          </span>
          {property.parking > 0 && (
            <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 flex items-center gap-1">
              <Car className="h-3 w-3" />
              {property.parking}
            </span>
          )}
          {property.mamad && (
            <span className="px-2 py-1 bg-green-100 rounded text-xs text-green-700 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Mamad
            </span>
          )}
          {property.airConditioning && (
            <span className="px-2 py-1 bg-blue-100 rounded text-xs text-blue-700 flex items-center gap-1">
              <Wind className="h-3 w-3" />
              A/C
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
