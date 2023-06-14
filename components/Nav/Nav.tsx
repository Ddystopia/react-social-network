'use client'

import React, { useEffect, useState } from 'react'
import classNames from './Nav.module.css'
import ListItem from './ListItem'
import { usePathname } from 'next/navigation'

export const Nav: React.FC = () => {
  const size = useWindowSize();
  const width = size == null ? 0 : size.width;
  const path = usePathname();
  const [menuHidden, setMenuHidden] = useState<boolean>(width <= 760);

  useEffect(() => {
    setMenuHidden(width <= 760)
  }, [width])

  const active = (p: string) => p == path ? classNames.active : null;

  return (
    <nav className={classNames.nav}>
      <div className={classNames.menuButton} onClick={() => setMenuHidden(p => !p)}>
        Menu
      </div>
      <div className={classNames.leftSide} />
      <ul id="menu" hidden={menuHidden}>
        <ListItem text='Profile' to='/profile' className={active('/profile')} />
        <ListItem text='Messages' to='/dialogs' className={active('/dialogs')} />
        <ListItem text='Users' to='/users' className={active('/users')} />
        <ListItem text='News' to='/news' className={active('/news')} />
      </ul>
    </nav>
  )
}

interface WindowSize {
  width: number,
  height: number
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize | null>(null);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
