import React from 'react'

export default ({ error, touched, children }) => (
  <div>
		{touched && error && <p>{error}</p>}
		{children}
  </div>
)
