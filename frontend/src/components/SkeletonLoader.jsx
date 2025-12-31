import React from 'react'

export default function SkeletonLoader() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-10 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
      </div>

      {/* Form Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-40 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Tasks Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-5 flex items-start gap-4 animate-pulse">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-3 bg-gray-100 rounded w-1/4"></div>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
