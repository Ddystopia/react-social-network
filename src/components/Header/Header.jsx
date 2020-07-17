import React from 'react'
import classNames from './Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = ({ logout, isAuth, login }) => {
  return (
    <header className={classNames.header}>
      <div className={classNames.welcome}>
        <h1>Welcome{isAuth ? `, ${login}` : ''}</h1>
      </div>
      {isAuth ? (
        <div className={classNames.logAct} onClick={logout}>
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
export default React.memo(Header)
