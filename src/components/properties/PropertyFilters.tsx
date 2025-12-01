'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import {
  NEIGHBORHOOD_NAMES,
  PROPERTY_TYPE_NAMES,
  LISTING_TYPE_NAMES
} from '@/lib/constants'

export function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showAdvanced, setShowAdvanced] = useState(false)

  const [filters, setFilters] = useState({
    listingType: searchParams?.get('listingType') || '',
    propertyType: searchParams?.get('propertyType') || '',
    neighborhood: searchParams?.get('neighborhood') || '',
    minPrice: searchParams?.get('minPrice') || '',
    maxPrice: searchParams?.get('maxPrice') || '',
    minRooms: searchParams?.get('minRooms') || '',
    maxRooms: searchParams?.get('maxRooms') || '',
    minSize: searchParams?.get('minSize') || '',
    maxSize: searchParams?.get('maxSize') || '',
    parking: searchParams?.get('parking') === 'true',
    elevator: searchParams?.get('elevator') === 'true',
    mamad: searchParams?.get('mamad') === 'true',
    sukka: searchParams?.get('sukka') === 'true',
    shabbatElevator: searchParams?.get('shabbatElevator') === 'true',
    airConditioning: searchParams?.get('airConditioning') === 'true',
  })

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== false as unknown) {
        params.set(key, String(value))
      }
    })

    router.push(`/properties?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      listingType: '',
      propertyType: '',
      neighborhood: '',
      minPrice: '',
      maxPrice: '',
      minRooms: '',
      maxRooms: '',
      minSize: '',
      maxSize: '',
      parking: false,
      elevator: false,
      mamad: false,
      sukka: false,
      shabbatElevator: false,
      airConditioning: false,
    })
    router.push('/properties')
  }

  const hasActiveFilters = Object.values(filters).some(v => v && v !== '' && v !== false as unknown)

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      {/* Main Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <Select
          value={filters.listingType}
          onChange={(e) => handleFilterChange('listingType', e.target.value)}
        >
          <option value="">All Types</option>
          {Object.entries(LISTING_TYPE_NAMES).map(([key, value]) => (
            <option key={key} value={key}>{value.en}</option>
          ))}
        </Select>

        <Select
          value={filters.neighborhood}
          onChange={(e) => handleFilterChange('neighborhood', e.target.value)}
        >
          <option value="">All Neighborhoods</option>
          {Object.entries(NEIGHBORHOOD_NAMES).map(([key, value]) => (
            <option key={key} value={key}>{value.en}</option>
          ))}
        </Select>

        <Select
          value={filters.propertyType}
          onChange={(e) => handleFilterChange('propertyType', e.target.value)}
        >
          <option value="">All Property Types</option>
          {Object.entries(PROPERTY_TYPE_NAMES).map(([key, value]) => (
            <option key={key} value={key}>{value.en}</option>
          ))}
        </Select>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={applyFilters} className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minRooms}
                  onChange={(e) => handleFilterChange('minRooms', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxRooms}
                  onChange={(e) => handleFilterChange('maxRooms', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size (m²)</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minSize}
                  onChange={(e) => handleFilterChange('minSize', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxSize}
                  onChange={(e) => handleFilterChange('maxSize', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.parking}
                onChange={(e) => handleFilterChange('parking', e.target.checked)}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm">Parking</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.elevator}
                onChange={(e) => handleFilterChange('elevator', e.target.checked)}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm">Elevator</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.mamad}
                onChange={(e) => handleFilterChange('mamad', e.target.checked)}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm">Mamad (Safe Room)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.sukka}
                onChange={(e) => handleFilterChange('sukka', e.target.checked)}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm">Sukkah Balcony</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.shabbatElevator}
                onChange={(e) => handleFilterChange('shabbatElevator', e.target.checked)}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm">Shabbat Elevator</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.airConditioning}
                onChange={(e) => handleFilterChange('airConditioning', e.target.checked)}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm">Air Conditioning</span>
            </label>
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-4 border-t mt-4">
          <Button variant="ghost" onClick={clearFilters} className="text-sm">
            <X className="h-4 w-4 mr-1" />
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
