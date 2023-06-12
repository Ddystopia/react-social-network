import React, { FC } from 'react'
import { UserInfo } from './UserInfo/UserInfo'
import { MyPosts } from './MyPosts/MyPosts'
import classNames from './Profile.module.css'
import { Profile as ProfileType } from '../../redux/profileReducer'

export const ProfileComponent: FC<Props> = ({ profile, status, updateUserStatus, isOwner, setPhoto, setProfile }: Props) => {
  return (
    <section className={classNames.content}>
      {/* <img
				className={classNames.img}
				src="http://getwallpapers.com/wallpaper/full/8/8/c/254974.jpg"
				alt="Some back"
			/> */}
      <UserInfo
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
        setPhoto={setPhoto}
        isOwner={isOwner}
        setProfile={setProfile}
      />
      <MyPosts isOwner={isOwner} />
    </section>
  )
}

interface Props {
  profile: ProfileType,
  status: string,
  isOwner: boolean,

  updateUserStatus: (status: string) => void,
  setPhoto: (photo: File) => void,
  setProfile: (profile: ProfileType) => void,
}
