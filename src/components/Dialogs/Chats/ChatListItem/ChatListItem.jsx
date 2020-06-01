import React from 'react'
import classNames from './ChatListItem.module.css'
import { NavLink } from 'react-router-dom'

const ChatListItem = ({ userName, id, onClick, newMessagesCount }) => {
  return (
    <li className={classNames.li} onClick={onClick}>
      <NavLink activeClassName={classNames.active} to={`/dialogs/${id}`}>
        <p>{userName}</p>
        {!!newMessagesCount && (
          <div className={classNames.newMessagesCount}>{newMessagesCount}</div>
        )}
      </NavLink>
    </li>
  )
}

export default ChatListItem
