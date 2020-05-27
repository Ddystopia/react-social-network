import React from 'react'
import UserInfo from './UserInfo/UserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import classNames from './Profile.module.css'

const Profile = ({ profile, status, updateUserStatus, isOwner, setPhoto, setProfile }) => {
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
      <MyPostsContainer />
    </section>
  )
}
export default Profile
