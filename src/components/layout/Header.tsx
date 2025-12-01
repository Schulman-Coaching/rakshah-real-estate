export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">Rakshah</span>
              <span className="text-teal-600 font-bold text-xl ml-1">Real Estate</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/properties" className="font-medium transition-colors text-gray-600 hover:text-teal-600">
              Beit Shemesh
            </a>
            <a href="/sde-dov" className="font-medium transition-colors text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full">
              Sde Dov
            </a>
            <a href="/calculator" className="font-medium transition-colors text-gray-600 hover:text-teal-600">
              Calculator
            </a>
            <a href="/documents" className="font-medium transition-colors text-gray-600 hover:text-teal-600">
              Documents
            </a>
            <a href="/contact" className="font-medium transition-colors text-gray-600 hover:text-teal-600">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100 text-gray-900 h-10 px-4 py-2">
              Sign In
            </a>
            <a href="/register" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-teal-600 text-white hover:bg-teal-700 h-10 px-4 py-2">
              List Property
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button type="button" className="md:hidden p-2">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
