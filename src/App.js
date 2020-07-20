import React, { useEffect } from 'react'
import HeaderContainer from './components/Header/HeaderContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import Nav from './components/Nav/Nav'
import './App.css'
import { Route, Redirect, Switch } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import { withSuspense } from './hoc/withSuspense'
import { errorHandler } from './utils/errorHandlers'

const NewsContainer = React.lazy(() => import('./components/News/NewsContainer'))
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage/NotFoundPage'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'))

const App = ({ initializeApp, initialized }) => {
  useEffect(() => {
    if (!initialized) initializeApp()
  }, [initializeApp, initialized])

  useEffect(() => {
    window.addEventListener('unhandledRejection', errorHandler)
    return window.removeEventListener('unhandledRejection', errorHandler)
  })

  return (
    <div className="app_wrapper">
      <HeaderContainer />
      <Nav />
      <main className="main">
        <Switch>
          <Redirect exact from="/" to="/profile" />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/dialogs/:userId?" render={() => <DialogsContainer />} />
          <Route path="/news" render={withSuspense(NewsContainer)} />
          <Route path="/users" render={withSuspense(UsersContainer)} />
          <Route path="/login" render={withSuspense(LoginContainer)} />
          <Route path="*" render={withSuspense(NotFoundPage)} />
        </Switch>
      </main>
    </div>
  )
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default compose(connect(mapStateToProps, { initializeApp }))(App)
