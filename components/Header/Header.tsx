'use client'

import React from 'react'
import classNames from './Header.module.css'
import { logout } from '../../redux/authReducer'
import { getIsAuth, getLogin } from '../../redux/selectors/selectors'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

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
        <Link className={classNames.logAct} href={'/login'}>
          <button>Login</button>
        </Link>
      )}
    </header>
  )
}
