import React from 'react'
import PropTypes from 'prop-types'
import classNames from './ChatListItem.module.css'
import { NavLink } from 'react-router-dom'

export const ChatListItem = ({ userName, id, onClick, newMessagesCount }) => {
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

ChatListItem.propTypes = {
  userName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  newMessagesCount: PropTypes.number.isRequired,
}
