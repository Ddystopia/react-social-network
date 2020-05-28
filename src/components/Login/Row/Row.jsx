import React from 'react'

export const Row = ({ error, touched, children, className }) => {
  const hasError = touched && error
  return (
    <div className={className}>
      {hasError && <p>{error}</p>}
      {children}
    </div>
  )
}
