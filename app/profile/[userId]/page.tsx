"use client"

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Preloader } from '@/components/common/Preloader/Preloader'
import { ProfileComponent } from '../Profile'
import { syncProfile, syncUserStatus, updateUserStatus, setPhoto, updateProfileData, Profile } from '@/redux/profileReducer'
import { getProfile, getAuthUserId, getStatus, getIsFetchingProfile, getAuthProfile } from '@/redux/selectors/selectors'

const ProfileContainer: React.FC<{ params: { userId?: string | null } }>
  = ({ params: { userId: paramId } }) => {
    const userId = paramId ? +paramId : null
    const router = useRouter()
    const dispatch = useDispatch()
    const authUserId = useSelector(getAuthUserId)

    useEffect(() => {
      if (!userId) {
        if (authUserId) {
          router.push(`/profile/${authUserId}`);
        } else {
          router.push(`/login`);
        }
      }
    }, [userId, authUserId, router])

    if (!userId) {
      return <></>;
    }

    const secondProfile = useSelector(getProfile(userId))
    const authProfile = useSelector(getAuthProfile)
    const status = useSelector(getStatus)
    const isFetching = useSelector(getIsFetchingProfile)

    useEffect(() => {
      if (secondProfile != null && secondProfile.userId === userId) {
        return
      }

      if (!secondProfile || isNaN(userId)) {
        router.push('/login')
      } else if (userId !== authUserId || !authProfile) {
        dispatch(syncProfile({ userId: userId }))
        dispatch(syncUserStatus({ userId: userId }))
      }
    }, [userId, authUserId, secondProfile, dispatch, authProfile])

    const profile = userId === authUserId || !userId ? authProfile : secondProfile

    return profile && !isFetching ? (
      <ProfileComponent
        profile={profile}
        status={status}
        isOwner={!userId || authUserId === secondProfile?.userId}

        updateUserStatus={(status: string) => updateUserStatus({ status })}
        setPhoto={(photo: File) => dispatch(setPhoto({ photo }))}
        setProfile={(profile: Profile) => dispatch(updateProfileData({ formData: profile }))}
      />
    ) : (
      <Preloader />
    )
  }

export async function generateStaticParams() {
  return [{
    props: {
      userId: null
    }
  }]
}



export default ProfileContainer

