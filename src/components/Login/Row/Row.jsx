import React from 'react'
import classNames from './Row.module.css'

export const Row = ({ hasError, children, className }) => {
  //prettier-ignore
  return (
    <div className={`${className || ''} ${hasError ? classNames.error : ''}`}>
      {children}
    </div>
  )
}
