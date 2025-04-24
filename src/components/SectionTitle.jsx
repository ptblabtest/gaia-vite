import React from 'react'

const SectionTitle = ({ title }) => {
  return (
    <h2 className="text-lg font-semibold py-1 border-gray-300">
      {title || 'Page Title'}
    </h2>
  )
}

export default SectionTitle