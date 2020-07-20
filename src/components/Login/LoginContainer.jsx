import React from 'react'
import Login from './Login'
import { login, getCaptchaUrl } from '../../redux/authReducer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import Preloader from '../common/Preloader/Preloader'
import {
  getIsAuth,
  getCaptchaUrlSelector,
  getIsFetchingAuth,
} from '../../redux/selectors/selectors'

const LoginContainer = ({ login, isAuth, isFetching, captchaUrl, history }) => {
  const loginUser = (formData) => {
    login(formData)
  }
  if (isFetching) return <Preloader />
  if (isAuth) history.goBack()
  else return <Login captchaUrl={captchaUrl} loginUser={loginUser} />
  return null
}

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
  isFetching: getIsFetchingAuth(state),
  captchaUrl: getCaptchaUrlSelector(state),
})

const mapDispatchToProps = { login, getCaptchaUrl }

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(LoginContainer)
