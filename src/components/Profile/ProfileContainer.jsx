import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import Preloader from '../common/Preloader/Preloader'
import {
  setProfile,
  getUserStatus,
  updateUserStatus,
  setPhoto,
  setProfileData,
} from '../../redux/profileReducer'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import {
  getProfile,
  getAuthUserId,
  getStatus,
  getIsFetchingProfile,
} from '../../redux/selectors/selectors'

const ProfileContainer = ({
  match,
  authUserId,
  profile,
  history,
  setProfile,
  getUserStatus,
  status,
  updateUserStatus,
  isFetching,
  setPhoto,
  setProfileData,
}) => {
  useEffect(() => {
    const userId = +match.params.userId || authUserId
    if (profile?.userId === userId) return
    if (!userId) return history.push('/login')

    const getProfile = (userId) => {
      setProfile(userId)
      getUserStatus(userId)
    }
    getProfile(userId)
  }, [match.params.userId, authUserId, profile, history, setProfile, getUserStatus])
  return profile && !isFetching ? (
    <Profile
      profile={profile}
      status={status}
      updateUserStatus={updateUserStatus}
      authUserId={authUserId}
      setPhoto={setPhoto}
      isOwner={!match.params.userId || authUserId === profile.userId}
      setProfile={setProfileData}
    />
  ) : (
    <Preloader />
  )
}

const mapStateToProps = (state) => ({
  profile: getProfile(state),
  authUserId: getAuthUserId(state),
  status: getStatus(state),
  isFetching: getIsFetchingProfile(state),
})

const mapDispatchToProps = {
  setProfile,
  getUserStatus,
  updateUserStatus,
  setPhoto,
  setProfileData,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProfileContainer)
