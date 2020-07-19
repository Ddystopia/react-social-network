import { authUser } from './authReducer'
import { setProfile, getUserStatus } from './profileReducer'
import { errorHandler } from '../utils/errorHandlers'

const SET_INITIALIZED_SUCCESS = 'appReducer/SET_INITIALIZED_SUCCESS'

const initial = {
  initialized: false,
}

const appReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: action.initialized,
      }
    default:
      return state
  }
}

const setInitialize = (initialized) => ({ type: SET_INITIALIZED_SUCCESS, initialized })

const initializeApp = () => async (dispatch) => {
  try {
    const id = await dispatch(authUser())
    if (id) await Promise.all([dispatch(setProfile(id, true)), dispatch(getUserStatus(id))])
  } catch (e) {
    errorHandler(e, 'Error to initialize app')
  } finally {
    dispatch(setInitialize(true))
  }
}

export { initializeApp, setInitialize }
export default appReducer
