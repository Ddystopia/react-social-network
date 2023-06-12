import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authAPI, securityAPI } from '@/api/api'
import { errorHandler } from '@/utils/errorHandlers'
import { initializeApp, setInitialized } from './appReducer'
import { LoginValues } from '@/api/api'
import { AppState } from './store'

interface AuthState {
  email: null | string,
  login: null | string,
  userId: null | number,
  isAuth: boolean,
  isFetching: boolean,
  captchaUrl: null | string,
}

const initialState: AuthState = {
  email: null,
  login: null,
  userId: null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null,
}

export const authUser = createAsyncThunk<number | null, void>('auth/user', async (_, { dispatch }) => {
  dispatch(getCaptchaUrl())
  dispatch(authSlice.actions.toggleIsFetching(true))
  const r = (await authAPI.me()) || {}

  if (r.resultCode === 0) {
    const { id, email, login } = r.data
    dispatch(authSlice.actions.setAuthUser({ userId: id, email, login }))
  } else {
    dispatch(authSlice.actions.logoutUser())
  }

  dispatch(authSlice.actions.toggleIsFetching(false))
  return r?.data?.id
})

export const login = createAsyncThunk<void, LoginValues, { state: AppState }>(
  'auth/login',
  async (formData, { dispatch }) => {
    try {
      const r = (await authAPI.login(formData)) || {}
      switch (r.resultCode) {
        case 0:
          await dispatch(initializeApp())
          dispatch(authSlice.actions.setCaptchaUrl(null))
          break
        case 10:
          dispatch(getCaptchaUrl())
        // eslint-disable-next-line no-fallthrough
        default:
          throw new Error(r?.messages?.join('\n') || 'Something wrong')
      }
    } catch (err) {
      errorHandler(err)
      dispatch(setInitialized(false))
    }
  })

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  const r = (await authAPI.logout()) || {}
  if (r.resultCode === 0) {
    dispatch(setInitialized(false))
    dispatch(authUser())

  }
})

export const getCaptchaUrl = createAsyncThunk('auth/captchaUrl', async (_, { dispatch }) => {
  const r = (await securityAPI.getCaptchaUrl()) || {}
  dispatch(authSlice.actions.setCaptchaUrl(r.url || null))
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<{ userId: number, email: string, login: string }>) => {
      state.userId = action.payload.userId
      state.email = action.payload.email
      state.login = action.payload.login
      state.isAuth = true
    },
    logoutUser: state => {
      state.userId = null
      state.email = null
      state.login = null
      state.isAuth = false
    },
    toggleIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload
    },
    setCaptchaUrl: (state, action: PayloadAction<string | null>) => {
      state.captchaUrl = action.payload
    }
  },
})

export default authSlice.reducer

