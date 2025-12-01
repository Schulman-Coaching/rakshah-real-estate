import Link from 'next/link'
import { Home, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-white">Rakshah</span>
                <span className="text-teal-400 font-bold text-xl ml-1">Real Estate</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted partner for real estate in Ramat Beit Shemesh and Greater Beit Shemesh.
              Helping families find their perfect home since 2024.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?listingType=SALE" className="text-gray-400 hover:text-white transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link href="/properties?listingType=RENT" className="text-gray-400 hover:text-white transition-colors">
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-gray-400 hover:text-white transition-colors">
                  Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/documents" className="text-gray-400 hover:text-white transition-colors">
                  Legal Documents
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Neighborhoods */}
          <div>
            <h3 className="font-semibold text-white mb-4">Neighborhoods</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?neighborhood=RBS_ALEPH" className="text-gray-400 hover:text-white transition-colors">
                  RBS Aleph
                </Link>
              </li>
              <li>
                <Link href="/properties?neighborhood=RBS_BET" className="text-gray-400 hover:text-white transition-colors">
                  RBS Bet
                </Link>
              </li>
              <li>
                <Link href="/properties?neighborhood=RBS_GIMMEL_1" className="text-gray-400 hover:text-white transition-colors">
                  RBS Gimmel
                </Link>
              </li>
              <li>
                <Link href="/properties?neighborhood=OLD_BS_CENTER" className="text-gray-400 hover:text-white transition-colors">
                  Old Beit Shemesh
                </Link>
              </li>
              <li>
                <Link href="/properties?neighborhood=NEVE_SHAMIR" className="text-gray-400 hover:text-white transition-colors">
                  Neve Shamir
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Ramat Beit Shemesh, Israel
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-500 flex-shrink-0" />
                <a href="tel:+972-52-000-0000" className="text-gray-400 hover:text-white transition-colors">
                  +972-52-000-0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-500 flex-shrink-0" />
                <a href="mailto:sarah@rakshah.com" className="text-gray-400 hover:text-white transition-colors">
                  sarah@rakshah.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Rakshah Real Estate. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
