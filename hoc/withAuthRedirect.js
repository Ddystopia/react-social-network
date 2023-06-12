import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsAuth } from '../redux/selectors/selectors'

export const withAuthRedirect = Component => {
  const RedirectComponent = props => {
    const isAuth = useSelector(getIsAuth)
    return isAuth ? <Component {...props} /> : <Redirect to="/login" />
  }
  return RedirectComponent
}
