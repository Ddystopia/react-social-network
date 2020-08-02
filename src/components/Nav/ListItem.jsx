import React from 'react'
import { NavLink } from 'react-router-dom'

export const ListItem = ({ text, to, active }) => (
  <li>
    <NavLink activeClassName={active} to={to}>
      {text}
    </NavLink>
  </li>
)
