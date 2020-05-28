import React from 'react'

export const Row = ({ error, touched, children, className }) => (
  <div className={className}>
    {touched && error && <p>{error}</p>}
    {children}
  </div>
)
