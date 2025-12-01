import Link from 'next/link'
import {
  MapPin,
  Building2,
  Waves,
  TreePalm,
  Train,
  ShoppingBag,
  Sun,
  ArrowRight,
  Phone,
  Mail,
} from 'lucide-react'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PropertyGrid } from '@/components/properties/PropertyGrid'
import { SDE_DOV_NEIGHBORHOODS } from '@/lib/constants'
import type { Neighborhood } from '@prisma/client'

export const dynamic = 'force-dynamic'

async function getSdeDovProperties() {
  const properties = await prisma.property.findMany({
    where: {
      neighborhood: {
        in: SDE_DOV_NEIGHBORHOODS as Neighborhood[],
      },
      status: 'ACTIVE',
    },
    include: {
      images: {
        orderBy: { order: 'asc' },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return properties
}

export default async function SdeDovPage() {
  const properties = await getSdeDovProperties()

  const highlights = [
    {
      icon: Waves,
      title: 'Mediterranean Beachfront',
      description: 'Direct access to pristine beaches and stunning sea views from premium residences.',
    },
    {
      icon: Building2,
      title: 'Modern Urban Development',
      description: 'State-of-the-art architecture with sustainable design and smart home features.',
    },
    {
      icon: Train,
      title: 'Excellent Connectivity',
      description: 'Light rail station, major highways, and proximity to Ben Gurion Airport.',
    },
    {
      icon: TreePalm,
      title: 'Parks & Green Spaces',
      description: 'Extensive parklands, cycling paths, and family-friendly recreational areas.',
    },
    {
      icon: ShoppingBag,
      title: 'Retail & Entertainment',
      description: 'World-class shopping centers, restaurants, and cultural venues.',
    },
    {
      icon: Sun,
      title: 'Tel Aviv Lifestyle',
      description: 'Experience the vibrant culture, nightlife, and innovation hub of Israel.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-teal-300" />
              <span className="text-teal-300 font-medium">Tel Aviv, Israel</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Sde Dov
            </h1>
            <p className="text-xl text-blue-100 mb-2">
              שדה דב
            </p>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl">
              Discover exclusive properties in Tel Aviv&apos;s most exciting new development.
              The former Sde Dov Airport is transforming into a premier residential neighborhood
              with beachfront living, modern amenities, and unparalleled Mediterranean views.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#properties">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  View Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold">12,000+</p>
                <p className="text-blue-200 text-sm">New Housing Units</p>
              </div>
              <div>
                <p className="text-3xl font-bold">1.5km</p>
                <p className="text-blue-200 text-sm">Beachfront</p>
              </div>
              <div>
                <p className="text-3xl font-bold">300+</p>
                <p className="text-blue-200 text-sm">Dunams of Parks</p>
              </div>
              <div>
                <p className="text-3xl font-bold">2025</p>
                <p className="text-blue-200 text-sm">First Residents</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The Future of Tel Aviv Living
          </h2>
          <p className="text-lg text-gray-600">
            Sde Dov represents the largest urban development project in Tel Aviv&apos;s history.
            Built on the site of the former domestic airport, this neighborhood offers a rare
            opportunity to own property in a brand-new, thoughtfully planned community with
            direct beach access and world-class infrastructure.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {highlights.map((highlight) => {
            const Icon = highlight.icon
            return (
              <Card key={highlight.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Neighborhoods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sde Dov Neighborhoods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">Sde Dov North</h3>
                <p className="text-blue-100 mb-4">
                  Family-oriented neighborhood with excellent schools, parks, and community centers.
                </p>
                <Link href="/properties?neighborhood=SDE_DOV_NORTH">
                  <Button variant="outline" size="sm">
                    View Properties
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">Sde Dov South</h3>
                <p className="text-teal-100 mb-4">
                  Urban living at its finest with high-rise towers, shopping, and entertainment.
                </p>
                <Link href="/properties?neighborhood=SDE_DOV_SOUTH">
                  <Button variant="outline" size="sm">
                    View Properties
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">Sde Dov Beachfront</h3>
                <p className="text-cyan-100 mb-4">
                  Premium properties with stunning Mediterranean views and beach access.
                </p>
                <Link href="/properties?neighborhood=SDE_DOV_BEACHFRONT">
                  <Button variant="outline" size="sm">
                    View Properties
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div id="properties" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Available Properties in Sde Dov
              </h2>
              <p className="text-gray-600 mt-2">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} available
              </p>
            </div>
            <Link href="/properties?neighborhood=SDE_DOV_NORTH,SDE_DOV_SOUTH,SDE_DOV_BEACHFRONT">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {properties.length > 0 ? (
            <PropertyGrid properties={properties} />
          ) : (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-12 text-center">
                <Building2 className="h-16 w-16 mx-auto text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-blue-700 max-w-md mx-auto mb-6">
                  Exclusive Sde Dov properties will be listed soon. Register your interest
                  to be the first to know when new listings become available.
                </p>
                <Link href="#contact">
                  <Button>Register Interest</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Interested in Sde Dov?
              </h2>
              <p className="text-gray-400 text-lg">
                Our team specializes in Sde Dov properties. Contact us for exclusive listings,
                investment opportunities, and personalized property tours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <a
                      href="tel:052-000-0000"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    >
                      <Phone className="h-5 w-5 text-teal-400" />
                      <span>052-000-0000</span>
                    </a>
                    <a
                      href="mailto:sdedov@rakshah-realestate.com"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    >
                      <Mail className="h-5 w-5 text-teal-400" />
                      <span>sdedov@rakshah-realestate.com</span>
                    </a>
                    <div className="flex items-start gap-3 text-gray-300">
                      <MapPin className="h-5 w-5 text-teal-400 mt-0.5" />
                      <span>
                        Sarah Rakshah Real Estate<br />
                        Sde Dov Sales Office<br />
                        Tel Aviv, Israel
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span>Early access to off-market listings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span>Expert knowledge of Sde Dov development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span>Bilingual support (English & Hebrew)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span>Investment analysis & ROI projections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span>End-to-end transaction support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Main Site */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            Also looking for properties in Beit Shemesh?
          </p>
          <Link href="/properties">
            <Button variant="outline">
              View Beit Shemesh Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
