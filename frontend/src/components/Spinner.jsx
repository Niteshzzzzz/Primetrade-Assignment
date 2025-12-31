import React from 'react'
import { FaSpinner } from 'react-icons/fa'

export default function Spinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} text-indigo-600 animate-spin`}>
        <FaSpinner />
      </div>
      {text && <p className="text-gray-600 font-medium">{text}</p>}
    </div>
  )
}
