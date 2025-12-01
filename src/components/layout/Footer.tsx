export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-xl text-white">Rakshah</span>
                <span className="text-teal-400 font-bold text-xl ml-1">Real Estate</span>
              </div>
            </a>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted partner for real estate in Ramat Beit Shemesh and Greater Beit Shemesh.
              Helping families find their perfect home since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/properties?listingType=SALE" className="text-gray-400 hover:text-white transition-colors">
                  Properties for Sale
                </a>
              </li>
              <li>
                <a href="/properties?listingType=RENT" className="text-gray-400 hover:text-white transition-colors">
                  Properties for Rent
                </a>
              </li>
              <li>
                <a href="/calculator" className="text-gray-400 hover:text-white transition-colors">
                  Cost Calculator
                </a>
              </li>
              <li>
                <a href="/documents" className="text-gray-400 hover:text-white transition-colors">
                  Legal Documents
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Neighborhoods */}
          <div>
            <h3 className="font-semibold text-white mb-4">Neighborhoods</h3>
            <ul className="space-y-2">
              <li>
                <a href="/properties?neighborhood=RBS_ALEPH" className="text-gray-400 hover:text-white transition-colors">
                  RBS Aleph
                </a>
              </li>
              <li>
                <a href="/properties?neighborhood=RBS_BET" className="text-gray-400 hover:text-white transition-colors">
                  RBS Bet
                </a>
              </li>
              <li>
                <a href="/properties?neighborhood=RBS_GIMMEL_1" className="text-gray-400 hover:text-white transition-colors">
                  RBS Gimmel
                </a>
              </li>
              <li>
                <a href="/properties?neighborhood=OLD_BS_CENTER" className="text-gray-400 hover:text-white transition-colors">
                  Old Beit Shemesh
                </a>
              </li>
              <li>
                <a href="/properties?neighborhood=NEVE_SHAMIR" className="text-gray-400 hover:text-white transition-colors">
                  Neve Shamir
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">
                Ramat Beit Shemesh, Israel
              </li>
              <li>
                <a href="tel:+972-52-000-0000" className="text-gray-400 hover:text-white transition-colors">
                  +972-52-000-0000
                </a>
              </li>
              <li>
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
            © 2024 Rakshah Real Estate. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
