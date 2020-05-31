import React from 'react'
import classNames from './ChatListItem.module.css'
import { NavLink } from 'react-router-dom'

const ChatListItem = ({ userName, id, onClick }) => {
  return (
    <li className={classNames.li} onClick={onClick}>
      <NavLink activeClassName={classNames.active} to={`/dialogs/${id}`}>
        {userName}
      </NavLink>
    </li>
  )
}

export default ChatListItem
