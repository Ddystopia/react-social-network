import { createStore, combineReducers, applyMiddleware } from 'redux'
import profileReducer from './profileReducer'
import dialogReducer from './dialogReducer'
import usersReducer from './usersReducer'
import newsReducer from './newsReducer'
import authReducer from './authReducer'
import appReducer from './appReducer'
import thunkMiddleware from 'redux-thunk'

const reducers = combineReducers({
  profileData: profileReducer,
  dialogData: dialogReducer,
  usersData: usersReducer,
  newsData: newsReducer,
  auth: authReducer,
  app: appReducer,
})
const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store // for debug, delete for production
export default store
