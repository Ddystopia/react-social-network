import React from 'react'
import { Preloader } from '../components/common/Preloader/Preloader'

export const withSuspense = Component => {
  const newComponent = props => {
    return (
      <React.Suspense fallback={<Preloader />}>
        <Component {...props} />
      </React.Suspense>
    )
  }
  return newComponent
}
