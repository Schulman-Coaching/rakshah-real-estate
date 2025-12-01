'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Search,
  Home,
  Building2,
  Calculator,
  FileText,
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { NEIGHBORHOOD_NAMES, PROPERTY_TYPE_NAMES } from '@/lib/constants'

export default function HomePage() {
  const router = useRouter()
  const [searchType, setSearchType] = useState<'SALE' | 'RENT'>('SALE')
  const [neighborhood, setNeighborhood] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set('listingType', searchType)
    if (neighborhood) params.set('neighborhood', neighborhood)
    if (propertyType) params.set('propertyType', propertyType)
    if (maxPrice) params.set('maxPrice', maxPrice)
    router.push(`/properties?${params.toString()}`)
  }

  const featuredNeighborhoods = [
    { key: 'RBS_ALEPH', image: '/images/rbs-aleph.jpg', listings: 45 },
    { key: 'RBS_BET', image: '/images/rbs-bet.jpg', listings: 32 },
    { key: 'RBS_GIMMEL_1', image: '/images/rbs-gimmel.jpg', listings: 28 },
    { key: 'OLD_BS_CENTER', image: '/images/old-bs.jpg', listings: 22 },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Home in Beit Shemesh
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Discover apartments, penthouses, and villas across Ramat Beit Shemesh
              and Greater Beit Shemesh. Your dream home awaits.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6">
            {/* Buy/Rent Tabs */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSearchType('SALE')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  searchType === 'SALE'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSearchType('RENT')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  searchType === 'RENT'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Rent
              </button>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              >
                <option value="">All Neighborhoods</option>
                {Object.entries(NEIGHBORHOOD_NAMES).map(([key, value]) => (
                  <option key={key} value={key}>{value.en}</option>
                ))}
              </Select>

              <Select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">All Property Types</option>
                {Object.entries(PROPERTY_TYPE_NAMES).map(([key, value]) => (
                  <option key={key} value={key}>{value.en}</option>
                ))}
              </Select>

              <Input
                type="number"
                placeholder={searchType === 'SALE' ? 'Max Price (ILS)' : 'Max Rent/Month'}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />

              <Button onClick={handleSearch} className="h-10">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-teal-600">500+</p>
              <p className="text-gray-600">Active Listings</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-teal-600">16</p>
              <p className="text-gray-600">Neighborhoods</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-teal-600">1,200+</p>
              <p className="text-gray-600">Happy Families</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-teal-600">10+</p>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Neighborhoods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Neighborhoods
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From the established communities of RBS Aleph and Bet to the growing
              neighborhoods of Gimmel and Daled, find your perfect location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNeighborhoods.map((n) => (
              <Link
                key={n.key}
                href={`/properties?neighborhood=${n.key}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-200"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {NEIGHBORHOOD_NAMES[n.key]?.en}
                  </h3>
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {n.listings} listings
                  </p>
                </div>
                <div className="absolute inset-0 bg-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/properties">
              <Button variant="outline" size="lg">
                View All Neighborhoods
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Real Estate Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for your real estate journey in Beit Shemesh,
              from property search to legal documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Property Search</h3>
                <p className="text-gray-600 mb-4">
                  Browse hundreds of listings across all Beit Shemesh neighborhoods
                  with advanced filters.
                </p>
                <Link href="/properties">
                  <Button variant="link" className="text-teal-600">
                    Browse Properties <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cost Calculator</h3>
                <p className="text-gray-600 mb-4">
                  Calculate purchase taxes, fees, and total costs including
                  Mas Rechisha and legal fees.
                </p>
                <Link href="/calculator">
                  <Button variant="link" className="text-blue-600">
                    Calculate Costs <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Legal Documents</h3>
                <p className="text-gray-600 mb-4">
                  Prepare rental agreements, purchase contracts, and other legal
                  documents in English and Hebrew.
                </p>
                <Link href="/documents">
                  <Button variant="link" className="text-purple-600">
                    Create Documents <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Rakshah Real Estate?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Local Expertise</h3>
                    <p className="text-gray-600">
                      Deep knowledge of every neighborhood in Beit Shemesh,
                      from established areas to new developments.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">English & Hebrew Support</h3>
                    <p className="text-gray-600">
                      Full bilingual service to help Anglo families navigate
                      the Israeli real estate market.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Complete Services</h3>
                    <p className="text-gray-600">
                      From property search to cost calculations and legal
                      document preparation, all in one place.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Trusted by Families</h3>
                    <p className="text-gray-600">
                      Over 1,200 families have found their home through our
                      personalized service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Building2 className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Sarah Rakshah</h3>
                  <p className="text-teal-100">Founder & Lead Agent</p>
                </div>
              </div>
              <p className="text-teal-50 mb-6">
                &ldquo;My mission is to help every family find not just a house,
                but a home where they can build their future. With over a decade
                of experience in Beit Shemesh real estate, I understand what
                makes each neighborhood unique.&rdquo;
              </p>
              <a href="tel:+972-52-000-0000">
                <Button variant="outline" className="bg-white text-teal-600 hover:bg-teal-50 border-white">
                  <Phone className="h-5 w-5 mr-2" />
                  Schedule a Call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your New Home?
          </h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Start your search today or get in touch with us for personalized
            assistance in finding your perfect property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg" variant="outline" className="bg-white text-teal-600 hover:bg-teal-50 border-white">
                Browse Properties
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-teal-800 text-white hover:bg-teal-900">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
