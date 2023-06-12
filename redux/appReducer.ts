import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authUser } from './authReducer'
import { syncProfile, syncUserStatus } from './profileReducer'
import { errorHandler } from '../utils/errorHandlers'

interface AppState {
  initialized: boolean;
}

const initialState: AppState = {
  initialized: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialize: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
  },
})

export const { setInitialize } = appSlice.actions

export const initializeApp = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    try {
      const authAction = await dispatch(authUser());
      const userId = authAction.payload as number;
      if (userId) {
        await Promise.all([
          dispatch(syncProfile({ userId })),
          dispatch(syncUserStatus({ userId }))
        ])
      }

    } catch (e) {
      errorHandler(e, 'Error to initialize app')
    } finally {
      dispatch(setInitialize(true))
    }
  })

export default appSlice.reducer

