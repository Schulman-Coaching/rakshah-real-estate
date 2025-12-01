'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  NEIGHBORHOOD_NAMES,
  PROPERTY_TYPE_NAMES,
  LISTING_TYPE_NAMES,
  FURNISHED_STATUS_NAMES
} from '@/lib/constants'

export default function NewPropertyPageClient() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    titleHe: '',
    description: '',
    descriptionHe: '',
    listingType: 'SALE',
    propertyType: 'APARTMENT',
    neighborhood: 'RBS_ALEPH',
    address: '',
    addressHe: '',
    floor: '',
    totalFloors: '',
    price: '',
    arnona: '',
    vaadBayit: '',
    sizeSqm: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    balconies: '0',
    parking: '0',
    storage: false,
    elevator: false,
    airConditioning: false,
    sukka: false,
    mamad: false,
    garden: false,
    rooftop: false,
    furnished: 'UNFURNISHED',
    renovated: false,
    yearBuilt: '',
    kosherKitchen: true,
    separateSink: false,
    buildingType: '',
    accessibleBuilding: false,
    shabbatElevator: false,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    isOwnerListing: false,
    availableFrom: '',
  })

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In production, this would call the API
      console.log('Submitting property:', formData)
      alert('Property created successfully! (Demo mode)')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating property:', error)
      alert('Error creating property')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-gray-600 hover:text-teal-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
          <p className="text-gray-500">Create a new property listing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Property title and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (English) *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Spacious 4-Room Apartment"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (Hebrew)
                  </label>
                  <Input
                    value={formData.titleHe}
                    onChange={(e) => handleInputChange('titleHe', e.target.value)}
                    placeholder="כותרת בעברית"
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (English) *
                </label>
                <textarea
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the property in detail..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Hebrew)
                </label>
                <textarea
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={4}
                  value={formData.descriptionHe}
                  onChange={(e) => handleInputChange('descriptionHe', e.target.value)}
                  placeholder="תיאור בעברית..."
                  dir="rtl"
                />
              </div>
            </CardContent>
          </Card>

          {/* Type & Location */}
          <Card>
            <CardHeader>
              <CardTitle>Type & Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Listing Type *
                  </label>
                  <Select
                    value={formData.listingType}
                    onChange={(e) => handleInputChange('listingType', e.target.value)}
                  >
                    {Object.entries(LISTING_TYPE_NAMES).map(([key, value]) => (
                      <option key={key} value={key}>{value.en}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type *
                  </label>
                  <Select
                    value={formData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  >
                    {Object.entries(PROPERTY_TYPE_NAMES).map(([key, value]) => (
                      <option key={key} value={key}>{value.en}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Neighborhood *
                  </label>
                  <Select
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                  >
                    {Object.entries(NEIGHBORHOOD_NAMES).map(([key, value]) => (
                      <option key={key} value={key}>{value.en}</option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address (English) *
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Street address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address (Hebrew)
                  </label>
                  <Input
                    value={formData.addressHe}
                    onChange={(e) => handleInputChange('addressHe', e.target.value)}
                    placeholder="כתובת בעברית"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor
                  </label>
                  <Input
                    type="number"
                    value={formData.floor}
                    onChange={(e) => handleInputChange('floor', e.target.value)}
                    placeholder="e.g., 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Floors in Building
                  </label>
                  <Input
                    type="number"
                    value={formData.totalFloors}
                    onChange={(e) => handleInputChange('totalFloors', e.target.value)}
                    placeholder="e.g., 8"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (ILS) *
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder={formData.listingType === 'SALE' ? '2,500,000' : '6,000'}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Arnona (Annual)
                </label>
                <Input
                  type="number"
                  value={formData.arnona}
                  onChange={(e) => handleInputChange('arnona', e.target.value)}
                  placeholder="Municipal tax"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vaad Bayit (Monthly)
                </label>
                <Input
                  type="number"
                  value={formData.vaadBayit}
                  onChange={(e) => handleInputChange('vaadBayit', e.target.value)}
                  placeholder="Building fees"
                />
              </div>
            </CardContent>
          </Card>

          {/* Size & Rooms */}
          <Card>
            <CardHeader>
              <CardTitle>Size & Rooms</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size (m²) *
                </label>
                <Input
                  type="number"
                  value={formData.sizeSqm}
                  onChange={(e) => handleInputChange('sizeSqm', e.target.value)}
                  placeholder="120"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rooms *
                </label>
                <Input
                  type="number"
                  step="0.5"
                  value={formData.rooms}
                  onChange={(e) => handleInputChange('rooms', e.target.value)}
                  placeholder="4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms *
                </label>
                <Input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  placeholder="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms *
                </label>
                <Input
                  type="number"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  placeholder="2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Balconies
                </label>
                <Input
                  type="number"
                  value={formData.balconies}
                  onChange={(e) => handleInputChange('balconies', e.target.value)}
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parking Spots
                </label>
                <Input
                  type="number"
                  value={formData.parking}
                  onChange={(e) => handleInputChange('parking', e.target.value)}
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Furnished
                </label>
                <Select
                  value={formData.furnished}
                  onChange={(e) => handleInputChange('furnished', e.target.value)}
                >
                  {Object.entries(FURNISHED_STATUS_NAMES).map(([key, value]) => (
                    <option key={key} value={key}>{value.en}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year Built
                </label>
                <Input
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                  placeholder="2020"
                />
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features & Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: 'storage', label: 'Storage Room' },
                  { key: 'elevator', label: 'Elevator' },
                  { key: 'airConditioning', label: 'Air Conditioning' },
                  { key: 'sukka', label: 'Sukkah Balcony' },
                  { key: 'mamad', label: 'Mamad (Safe Room)' },
                  { key: 'garden', label: 'Garden' },
                  { key: 'rooftop', label: 'Rooftop Access' },
                  { key: 'renovated', label: 'Recently Renovated' },
                  { key: 'kosherKitchen', label: 'Kosher Kitchen' },
                  { key: 'separateSink', label: 'Separate Sink (Meat/Dairy)' },
                  { key: 'accessibleBuilding', label: 'Accessible Building' },
                  { key: 'shabbatElevator', label: 'Shabbat Elevator' },
                ].map((feature) => (
                  <label key={feature.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[feature.key as keyof typeof formData] as boolean}
                      onChange={(e) => handleInputChange(feature.key, e.target.checked)}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm">{feature.label}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name *
                  </label>
                  <Input
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    placeholder="Sarah Rakshah"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <Input
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="052-000-0000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isOwnerListing}
                  onChange={(e) => handleInputChange('isOwnerListing', e.target.checked)}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm">This is a direct listing from the owner (no agent)</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available From
                </label>
                <Input
                  type="date"
                  value={formData.availableFrom}
                  onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4 justify-end">
            <Link href="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Listing'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
