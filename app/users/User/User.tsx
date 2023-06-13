import React from 'react'
import Link from 'next/link'
import classNames from './User.module.css'
import standardAvatar from '@/public/images/standardAvatar.jpg'
import { User } from '@/redux/usersReducer'

export const UserComponent: React.FC<Props> = ({ data, id, disabled, unFollow, follow }) => {
  return (
    <li className={classNames.li}>
      <div className={classNames.info}>
        <h3>{data.name}</h3>
        <h4>id: {id}</h4>
        <p>{data.status}</p>
      </div>
      <Link
        className={classNames.avatarWrapper}
        href={`profile/${id}`}
        area-label={`To user ${data.name} profile`}
      >
        <img className={classNames.avatar} src={data.photos.small || standardAvatar.src} alt="avatar" />
      </Link>
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


type Props = {
  data: User
  id: number
  disabled: boolean
  unFollow: (id: number) => void
  follow: (id: number) => void
}
