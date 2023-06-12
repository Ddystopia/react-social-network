// import { createStore, combineReducers, applyMiddleware } from 'redux'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import profileReducer from './profileReducer'
import dialogReducer from './dialogReducer'
import usersReducer from './usersReducer'
import newsReducer from './newsReducer'
import authReducer from './authReducer'
import appReducer from './appReducer'

export const store = configureStore({
  reducer: {
    profileData: profileReducer,
    dialogData: dialogReducer,
    usersData: usersReducer,
    newsData: newsReducer,
    auth: authReducer,
    app: appReducer,
  }

})

// window.store = store // for debug, delete for production
export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>
