import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    return props.isAuth ? <Component {...props} /> : <Redirect to="/login" />
  }
  const mapStateToProps = (state) => ({ isAuth: state.auth.isAuth })

  return compose(connect(mapStateToProps))(RedirectComponent)
}

export { withAuthRedirect }
