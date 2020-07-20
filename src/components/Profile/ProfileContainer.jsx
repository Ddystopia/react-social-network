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
  getAuthProfile,
} from '../../redux/selectors/selectors'

const ProfileContainer = ({
  match,
  authUserId,
  profile,
  authProfile,
  history,
  setProfile,
  getUserStatus,
  status,
  updateUserStatus,
  isFetching,
  setPhoto,
  setProfileData,
}) => {
  const paramId = +match.params.userId
  useEffect(() => {
    const userId = paramId || authUserId
    if (profile?.userId === userId) return
    if (!userId) return history.push('/login')

    const getProfile = (userId) => {
      if (userId === authUserId && authProfile) return
      setProfile(userId, userId === authUserId)
      getUserStatus(userId)
    }
    getProfile(userId)
  }, [paramId, authUserId, profile, history, setProfile, getUserStatus, authProfile])

  const profileToProps = paramId === authUserId || !paramId ? authProfile : profile
  return profileToProps && !isFetching ? (
    <Profile
      profile={profileToProps}
      status={status}
      updateUserStatus={updateUserStatus}
      authUserId={authUserId}
      setPhoto={setPhoto}
      isOwner={!paramId || authUserId === profile.userId}
      setProfile={setProfileData}
    />
  ) : (
    <Preloader />
  )
}

const mapStateToProps = (state) => ({
  profile: getProfile(state),
  authProfile: getAuthProfile(state),
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
