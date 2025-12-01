'use client'

import { useState } from 'react'
import { Menu, X, Home, Calculator, FileText, Phone, Building2 } from 'lucide-react'

const navigation = [
  { name: 'Beit Shemesh', href: '/properties', icon: Home },
  { name: 'Sde Dov', href: '/sde-dov', icon: Building2 },
  { name: 'Calculator', href: '/calculator', icon: Calculator },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Contact', href: '/contact', icon: Phone },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-t shadow-lg md:hidden">
          <div className="container mx-auto px-4 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 py-3 text-gray-600 hover:text-teal-600"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </a>
              )
            })}
            <div className="flex gap-3 pt-4 border-t mt-4">
              <a href="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                <button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 h-10 px-4 py-2">
                  Sign In
                </button>
              </a>
              <a href="/register" className="flex-1" onClick={() => setIsOpen(false)}>
                <button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-teal-600 text-white hover:bg-teal-700 h-10 px-4 py-2">
                  List Property
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
