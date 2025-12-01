import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Car,
  Building,
  Shield,
  Wind,
  TreePine,
  ChefHat,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  ArrowLeft,
  Share2,
  Heart,
  Layers,
  Home,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactForm } from '@/components/properties/ContactForm'
import {
  NEIGHBORHOOD_NAMES,
  PROPERTY_TYPE_NAMES,
  LISTING_TYPE_NAMES,
  FURNISHED_STATUS_NAMES,
  BUILDING_TYPE_NAMES,
  formatPrice
} from '@/lib/constants'

async function getProperty(slug: string) {
  const property = await prisma.property.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
    },
  })

  return property
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const property = await getProperty(params.slug)

  if (!property) {
    notFound()
  }

  const neighborhoodName = NEIGHBORHOOD_NAMES[property.neighborhood]?.en || property.neighborhood
  const propertyTypeName = PROPERTY_TYPE_NAMES[property.propertyType]?.en || property.propertyType
  const listingTypeName = LISTING_TYPE_NAMES[property.listingType]?.en || property.listingType
  const furnishedName = FURNISHED_STATUS_NAMES[property.furnished]?.en || property.furnished
  const buildingTypeName = property.buildingType
    ? BUILDING_TYPE_NAMES[property.buildingType]?.en || property.buildingType
    : null

  const primaryImage = property.images.find(img => img.isPrimary) || property.images[0]

  // Features list
  const features = [
    { name: 'Parking', value: property.parking, icon: Car, available: property.parking > 0 },
    { name: 'Elevator', value: property.elevator, icon: Building, available: property.elevator },
    { name: 'Mamad (Safe Room)', value: property.mamad, icon: Shield, available: property.mamad },
    { name: 'Air Conditioning', value: property.airConditioning, icon: Wind, available: property.airConditioning },
    { name: 'Storage', value: property.storage, icon: Layers, available: property.storage },
    { name: 'Garden', value: property.garden, icon: TreePine, available: property.garden },
    { name: 'Rooftop', value: property.rooftop, icon: Home, available: property.rooftop },
    { name: 'Sukkah Balcony', value: property.sukka, icon: TreePine, available: property.sukka },
    { name: 'Kosher Kitchen', value: property.kosherKitchen, icon: ChefHat, available: property.kosherKitchen },
    { name: 'Separate Sink', value: property.separateSink, icon: ChefHat, available: property.separateSink },
    { name: 'Shabbat Elevator', value: property.shabbatElevator, icon: Building, available: property.shabbatElevator },
    { name: 'Accessible Building', value: property.accessibleBuilding, icon: Building, available: property.accessibleBuilding },
    { name: 'Renovated', value: property.renovated, icon: CheckCircle2, available: property.renovated },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Link
            href="/properties"
            className="inline-flex items-center text-sm text-gray-600 hover:text-teal-600"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Properties
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="bg-gray-900">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-4 gap-2 max-h-[500px]">
            {/* Main Image */}
            <div className="col-span-4 md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto">
              <Image
                src={primaryImage?.url || '/placeholder-property.jpg'}
                alt={property.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            {/* Thumbnails */}
            {property.images.slice(1, 5).map((image, idx) => (
              <div key={image.id} className="hidden md:block relative aspect-[4/3]">
                <Image
                  src={image.url}
                  alt={image.caption || `Property image ${idx + 2}`}
                  fill
                  className="object-cover rounded-lg"
                />
                {idx === 3 && property.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      +{property.images.length - 5} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  property.listingType === 'SALE'
                    ? 'bg-teal-600 text-white'
                    : property.listingType === 'RENT'
                    ? 'bg-blue-600 text-white'
                    : 'bg-purple-600 text-white'
                }`}>
                  {listingTypeName}
                </span>
                <span className="text-gray-500 text-sm">{propertyTypeName}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2 text-teal-600" />
                <span>{property.address}, {neighborhoodName}</span>
              </div>

              <div className="text-4xl font-bold text-teal-600">
                {formatPrice(property.price, property.listingType)}
                {property.pricePerMeter && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({formatPrice(property.pricePerMeter)}/m²)
                  </span>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <BedDouble className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                    <p className="text-2xl font-bold">{property.rooms}</p>
                    <p className="text-sm text-gray-500">Rooms</p>
                  </div>
                  <div className="text-center">
                    <Bath className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                    <p className="text-2xl font-bold">{property.bathrooms}</p>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <Ruler className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                    <p className="text-2xl font-bold">{property.sizeSqm}</p>
                    <p className="text-sm text-gray-500">m²</p>
                  </div>
                  <div className="text-center">
                    <Building className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                    <p className="text-2xl font-bold">
                      {property.floor || '-'}/{property.totalFloors || '-'}
                    </p>
                    <p className="text-sm text-gray-500">Floor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <div
                        key={feature.name}
                        className={`flex items-center gap-2 p-3 rounded-lg ${
                          feature.available
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-50 text-gray-400'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm">{feature.name}</span>
                        {feature.available ? (
                          <CheckCircle2 className="h-4 w-4 ml-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 ml-auto" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Property Type</dt>
                    <dd className="font-medium">{propertyTypeName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Neighborhood</dt>
                    <dd className="font-medium">{neighborhoodName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Furnished</dt>
                    <dd className="font-medium">{furnishedName}</dd>
                  </div>
                  {buildingTypeName && (
                    <div>
                      <dt className="text-sm text-gray-500">Building Type</dt>
                      <dd className="font-medium">{buildingTypeName}</dd>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div>
                      <dt className="text-sm text-gray-500">Year Built</dt>
                      <dd className="font-medium">{property.yearBuilt}</dd>
                    </div>
                  )}
                  {property.balconies > 0 && (
                    <div>
                      <dt className="text-sm text-gray-500">Balconies</dt>
                      <dd className="font-medium">{property.balconies}</dd>
                    </div>
                  )}
                  {property.arnona && (
                    <div>
                      <dt className="text-sm text-gray-500">Arnona (Municipal Tax)</dt>
                      <dd className="font-medium">{formatPrice(property.arnona)}/year</dd>
                    </div>
                  )}
                  {property.vaadBayit && (
                    <div>
                      <dt className="text-sm text-gray-500">Vaad Bayit</dt>
                      <dd className="font-medium">{formatPrice(property.vaadBayit)}/month</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-lg">{property.contactName}</p>
                    {property.isOwnerListing && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        Direct from Owner
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <a
                      href={`tel:${property.contactPhone}`}
                      className="flex items-center gap-3 p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span className="font-medium">{property.contactPhone}</span>
                    </a>

                    {property.contactEmail && (
                      <a
                        href={`mailto:${property.contactEmail}?subject=Inquiry about ${property.title}`}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Mail className="h-5 w-5 text-gray-600" />
                        <span>Send Email</span>
                      </a>
                    )}

                    <a
                      href={`https://wa.me/${property.contactPhone.replace(/\D/g, '')}?text=Hi, I'm interested in the property: ${property.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="font-medium">WhatsApp</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              {property.availableFrom && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-5 w-5" />
                      <span>
                        Available from{' '}
                        {new Date(property.availableFrom).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact Form */}
              <ContactForm propertyId={property.id} propertyTitle={property.title} />

              {/* Cost Calculator Link */}
              <Card className="bg-teal-50 border-teal-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-teal-800 mb-2">
                    Calculate Total Costs
                  </h3>
                  <p className="text-sm text-teal-700 mb-3">
                    Get a detailed breakdown of purchase costs, taxes, and fees.
                  </p>
                  <Link href={`/calculator?propertyId=${property.id}&price=${property.price}`}>
                    <Button className="w-full">
                      Open Cost Calculator
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
