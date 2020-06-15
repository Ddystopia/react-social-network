import { authAPI, securityAPI } from '../api/api'
import { errorHandler } from '../utils/errorHandlers'
import { initializeApp, setInitialize } from './appReducer'

const TOGGLE_IS_FETCHING = 'authReducer/TOGGLE_IS_FETCHING'
const SET_AUTH_USER = 'authReducer/SET_AUTH_USER'
const SET_CAPTCHA_URL = 'authReducer/SET_CAPTCHA_URL'

const initial = {
  email: null,
  login: null,
  userId: null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null,
}

const authReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        ...action.data,
        isAuth: action.isAuth,
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case SET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      }
    default:
      return state
  }
}

const setAuthUser = (userId, email, login) => ({
  type: SET_AUTH_USER,
  data: { userId, email, login },
  isAuth: true,
})

const logoutUser = () => ({
  type: SET_AUTH_USER,
  data: { userId: null, email: null, login: null },
  isAuth: false,
})

const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})

const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  captchaUrl,
})

const authUser = () => async (dispatch) => {
  dispatch(getCaptchaUrl())
  dispatch(toggleIsFetching(true))
  const r = await authAPI.me()

  if (r.resultCode === 0) {
    const { id, email, login } = r.data
    dispatch(setAuthUser(id, email, login))
  } else dispatch(logoutUser())

  dispatch(toggleIsFetching(false))
  return r.data.id
}

const login = (formData) => async (dispatch) => {
  try {
    const r = await authAPI.login(formData)
    switch (r.resultCode) {
      case 0:
				dispatch(setInitialize(false))
				dispatch(initializeApp())
        dispatch(setCaptchaUrl(null))
        break
      case 10:
        dispatch(getCaptchaUrl())
      // eslint-disable-next-line no-fallthrough
      default:
        throw new Error(r.messages.join('\n') || 'Something wrong')
    }
  } catch (err) {
    errorHandler(err)
  }
}

const logout = () => async (dispatch) => {
  const r = await authAPI.logout()
  if (r.resultCode === 0) {
    dispatch(authUser())
  }
}

const getCaptchaUrl = () => async (dispatch) => {
  const r = await securityAPI.getCaptchaUrl()
  dispatch(setCaptchaUrl(r.url))
}

export { authUser, login, logout, setAuthUser, toggleIsFetching, getCaptchaUrl }
export default authReducer
