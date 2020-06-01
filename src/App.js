import React, { useEffect } from 'react'
import HeaderContainer from './components/Header/HeaderContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
// import UsersContainer from "./components/Users/UsersContainer"
// import LoginContainer from "./components/Login/LoginContainer"
import Nav from './components/Nav/Nav'
import './App.css'
import { Route, Redirect, Switch } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import swal from 'sweetalert2'
import { withSuspense } from './hoc/withSuspense'

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'))

const App = ({ initializeApp, initialized }) => {
  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  useEffect(() => {
    const catchAllUnhandledErrors = (err) => {
      swal.fire(err.name, err.message, 'error')
    }
    window.addEventListener('unhandledRejection', catchAllUnhandledErrors)
    return window.removeEventListener('unhandledRejection', catchAllUnhandledErrors)
  })

  return initialized ? (
    <div className="app_wrapper">
      <HeaderContainer />
      <Nav />
      <main className="main">
        <Switch>
          <Redirect exact from="/" to="/profile" />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/dialogs/:userId?" render={() => <DialogsContainer />} />
          <Route path="/users" render={withSuspense(UsersContainer)} />
          <Route path="/login" render={withSuspense(LoginContainer)} />
          <Route path="*" render={() => <div>404 not found</div>} />
        </Switch>
      </main>
    </div>
  ) : (
    <Preloader />
  )
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default compose(connect(mapStateToProps, { initializeApp }))(App)
