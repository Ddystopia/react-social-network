import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export const ListItem = ({ text, to, active }) => (
  <li>
    <NavLink activeClassName={active} to={to}>
      {text}
    </NavLink>
  </li>
)

ListItem.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
}
