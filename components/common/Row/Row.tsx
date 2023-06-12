import React from 'react'
import classNames from './Row.module.css'

export const Row: React.FC<Props> = ({ hasError, children, className }) => {
  return (
    <div className={`${className || ''} ${hasError ? classNames.error : ''}`}>
      {children}
    </div>
  )
}

interface Props {
  hasError?: boolean
  className?: string
  children: React.ReactNode
}
