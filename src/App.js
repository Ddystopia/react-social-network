import React, { useEffect } from 'react'
import { Header } from './components/Header/Header'
import ProfileContainer from './components/Profile/ProfileContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import { Nav } from './components/Nav/Nav'
import './App.css'
import { Route, Redirect, Switch } from 'react-router-dom'
import { initializeApp } from './redux/appReducer'
import { withSuspense } from './hoc/withSuspense'
import { errorHandler } from './utils/errorHandlers'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialized } from './redux/selectors/selectors'

const News = React.lazy(() => import('./components/News/News'))
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage/NotFoundPage'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'))

export const App = () => {
  const dispatch = useDispatch()
  const initialized = useSelector(getInitialized)

  useEffect(() => {
    if (!initialized) dispatch(initializeApp())
  }, [dispatch, initialized])

  useEffect(() => {
    window.addEventListener('unhandledRejection', errorHandler)
    return window.removeEventListener('unhandledRejection', errorHandler)
  })

  return (
    <div className="app_wrapper">
      <Header />
      <Nav />
      <main className="main">
        <Switch>
          <Redirect exact from="/" to="/profile" />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/dialogs/:userId?" render={() => <DialogsContainer />} />
          <Route path="/news" render={withSuspense(News)} />
          <Route path="/users" render={withSuspense(UsersContainer)} />
          <Route path="/login" render={withSuspense(LoginContainer)} />
          <Route path="*" render={withSuspense(NotFoundPage)} />
        </Switch>
      </main>
    </div>
  )
}
