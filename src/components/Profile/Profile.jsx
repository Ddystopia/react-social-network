import React from 'react'
import PropTypes from 'prop-types'
import { UserInfo } from './UserInfo/UserInfo'
import { MyPosts } from './MyPosts/MyPosts'
import classNames from './Profile.module.css'
import { profileSchema } from '../../redux/profileReducer'

export const Profile = ({ profile, status, updateUserStatus, isOwner, setPhoto, setProfile }) => {
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

Profile.propTypes = {
  profile: profileSchema,
  status: PropTypes.string.isRequired,
  updateUserStatus: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
  setPhoto: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
}
