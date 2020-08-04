import React from 'react'
import PropTypes from 'prop-types'
import { Login } from './Login'
import { login } from '../../redux/authReducer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Preloader } from '../common/Preloader/Preloader'
import {
  getIsAuth,
  getCaptchaUrlSelector,
  getIsFetchingAuth,
} from '../../redux/selectors/selectors'

const LoginContainer = ({ login, isAuth, isFetching, captchaUrl }) => {
  const loginUser = formData => {
    login(formData)
	}
	
  if (isFetching) return <Preloader />
  if (isAuth) return <Redirect to={'/profile'} />

  return <Login captchaUrl={captchaUrl} loginUser={loginUser} />
}

const mapStateToProps = state => ({
  isAuth: getIsAuth(state),
  isFetching: getIsFetchingAuth(state),
  captchaUrl: getCaptchaUrlSelector(state),
})

export default compose(connect(mapStateToProps, { login }))(LoginContainer)

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  captchaUrl: PropTypes.string,
}
