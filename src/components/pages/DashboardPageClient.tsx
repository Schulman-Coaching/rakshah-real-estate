'use client'

import Link from 'next/link'
import {
  Home,
  FileText,
  MessageSquare,
  TrendingUp,
  Plus,
  Eye,
  Clock,
  DollarSign,
  Building2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DashboardPageClient() {
  // Mock data - in production this would come from the database
  const stats = {
    totalListings: 124,
    activeListings: 98,
    totalViews: 15240,
    inquiriesThisMonth: 45,
    documentsGenerated: 67,
    revenueThisMonth: 125000,
  }

  const recentInquiries = [
    { id: '1', property: '4-Room Apartment in RBS Aleph', name: 'David Cohen', date: '2 hours ago' },
    { id: '2', property: 'Penthouse in RBS Gimmel', name: 'Sarah Levy', date: '5 hours ago' },
    { id: '3', property: '3-Room Garden Apt in Sheinfeld', name: 'Michael Stern', date: '1 day ago' },
  ]

  const recentListings = [
    { id: '1', title: '5-Room Duplex in RBS Bet', status: 'ACTIVE', views: 234, price: 3200000 },
    { id: '2', title: '4-Room Apartment in RBS Aleph', status: 'PENDING', views: 189, price: 2100000 },
    { id: '3', title: 'Villa in Neve Shamir', status: 'ACTIVE', views: 567, price: 5500000 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500">Welcome back, Sarah</p>
            </div>
            <Link href="/dashboard/properties/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Listing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Home className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalListings}</p>
                  <p className="text-xs text-gray-500">Total Listings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.activeListings}</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Views</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.inquiriesThisMonth}</p>
                  <p className="text-xs text-gray-500">Inquiries</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.documentsGenerated}</p>
                  <p className="text-xs text-gray-500">Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{(stats.revenueThisMonth / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Inquiries */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Inquiries</CardTitle>
              <Link href="/dashboard/inquiries">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-sm text-gray-500">{inquiry.property}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {inquiry.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Listings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Listings</CardTitle>
              <Link href="/dashboard/properties">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{listing.title}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          listing.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {listing.status}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {listing.views}
                        </span>
                      </div>
                    </div>
                    <p className="font-semibold text-teal-600">
                      {new Intl.NumberFormat('he-IL', {
                        style: 'currency',
                        currency: 'ILS',
                        maximumFractionDigits: 0,
                      }).format(listing.price)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dashboard/properties/new">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                  <Plus className="h-6 w-6" />
                  <span>Add Listing</span>
                </Button>
              </Link>
              <Link href="/dashboard/inquiries">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span>View Inquiries</span>
                </Button>
              </Link>
              <Link href="/documents">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Create Document</span>
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>View Analytics</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
