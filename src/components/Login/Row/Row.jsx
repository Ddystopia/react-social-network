import React from 'react'
import PropTypes from 'prop-types'
import classNames from './Row.module.css'

export const Row = ({ hasError, children, className }) => {
  //prettier-ignore
  return (
    <div className={`${className || ''} ${hasError ? classNames.error : ''}`}>
      {children}
    </div>
  )
}
Row.propTypes = {
  hasError: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
}
