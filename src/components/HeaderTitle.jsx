import React from 'react'

const HeaderTitle = ({ title }) => {
  return (
    <h1 className="text-xl font-semibold">
      {title || 'Page Title'}
    </h1>
  )
}

export default HeaderTitle