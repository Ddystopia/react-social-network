import { authUser } from './authReducer'
import { setProfile, getUserStatus } from './profileReducer'

const SET_INITIALIZED_SUCCESS = 'appReducer/SET_INITIALIZED_SUCCESS'

const initial = {
  initialized: false,
}

const appReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}

const initializeSuccess = () => ({ type: SET_INITIALIZED_SUCCESS })

const initializeApp = () => async (dispatch) => {
  const id = await dispatch(authUser())
  if (id) {
    await Promise.all([dispatch(setProfile(id)), dispatch(getUserStatus(id))])
    dispatch(initializeSuccess())
  }
}

export { initializeApp, initializeSuccess }
export default appReducer
