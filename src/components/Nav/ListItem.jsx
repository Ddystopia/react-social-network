import React from 'react'
import { NavLink } from 'react-router-dom'

export default ({ text, to, active, keyProp }) => (
  <li key={keyProp}>
    <NavLink activeClassName={active} to={to}>
      {text}
    </NavLink>
  </li>
)
