import React from 'react'
import classNames from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { logout } from '../../redux/authReducer'
import { getIsAuth, getLogin } from '../../redux/selectors/selectors'
import { useDispatch, useSelector } from 'react-redux'

export const Header = () => {
  const dispatch = useDispatch()
  const logoutDispatch = () => dispatch(logout())
  const isAuth = useSelector(getIsAuth)
  const login = useSelector(getLogin)

  return (
    <header className={classNames.header}>
      <div className={classNames.welcome}>
        <h1>Welcome{isAuth ? `, ${login}` : ''}</h1>
      </div>
      {isAuth ? (
        <div className={classNames.logAct} onClick={logoutDispatch}>
          <button>Logout</button>
        </div>
      ) : (
        <NavLink className={classNames.logAct} to={'/login'}>
          <button>Login</button>
        </NavLink>
      )}
    </header>
  )
}
