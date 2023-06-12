import React from 'react'
import Link from 'next/link'
import classNames from './User.module.css'
import standardAvatar from '@/public/images/standardAvatar.jpg'

export const User: React.FC<Props> = ({ data, id, disabled, unFollow, follow }) => {
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

export type UserData = {
  followed: boolean
  id: number
  name: string
  photos: {
    small: string
    large: string
  }
  status: string
  uniqueUrlName: string
}

type Props = {
  data: UserData
  id: number
  disabled: boolean
  unFollow: (id: number) => void
  follow: (id: number) => void
}
