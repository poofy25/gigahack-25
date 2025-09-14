import React from 'react'

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Not Found</h2>
        <p className="text-gray-600 mb-4">Could not find the requested resource</p>
        <a href="/" className="text-blue-500 hover:underline">
          Return Home
        </a>
      </div>
    </div>
  )
}