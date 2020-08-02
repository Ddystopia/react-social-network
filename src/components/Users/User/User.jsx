import React from 'react'
import classNames from './User.module.css'
import standardAvatar from '../../../assets/images/standardAvatar.jpg'
import { NavLink } from 'react-router-dom'

export const User = ({ data, id, disabled, unFollow, follow }) => {
  return (
    <li className={classNames.li}>
      <div className={classNames.info}>
        <h3>{data.name}</h3>
        <h4>id: {id}</h4>
        <p>{data.status}</p>
      </div>
      <NavLink
        className={classNames.avatarWrapper}
        to={`profile/${id}`}
        area-label={`To user ${data.name} profile`}
      >
        <img className={classNames.avatar} src={data.photos.small || standardAvatar} alt="avatar" />
      </NavLink>
      {
        <button
          className={classNames.butt}
          disabled={disabled}
          onClick={data.followed ? () => unFollow(data.id) : () => follow(data.id)}
        >
          {data.followed ? 'Unfollow' : 'Follow'}
        </button>
      }
    </li>
  )
}

