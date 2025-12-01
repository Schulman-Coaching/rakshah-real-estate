'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Something went wrong</h2>
        <p className="text-gray-600 mt-2 max-w-md">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  )
}
