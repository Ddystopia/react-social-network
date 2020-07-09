import React, { useState, useEffect } from 'react'
import classNames from './Nav.module.css'
import ListItem from './ListItem'

const Nav = () => {
  const [menuState, setMenuState] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })
  useEffect(() => {
    setMenuState(width < 761)
  }, [width])
  const menuChange = () => setMenuState(!menuState)

  return (
    <nav className={classNames.nav}>
      <div className={classNames.menuButton} onClick={menuChange}>
        Menu
      </div>
      <div className={classNames.leftSide} />
      <ul id="menu" hidden={menuState}>
        <ListItem text={'Profile'} to={'/profile'} keyProp={1} active={classNames.active} />
        <ListItem text={'Messages'} to={'/dialogs'} keyProp={2} active={classNames.active} />
        <ListItem text={'Users'} to={'/users'} keyProp={3} active={classNames.active} />
        <ListItem text={'News'} to={'/news'} keyProp={4} active={classNames.active} />
        <ListItem text={'Settings'} to={'/settings'} keyProp={5} active={classNames.active} />
      </ul>
    </nav>
  )
}

export default Nav
