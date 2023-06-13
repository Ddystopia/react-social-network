"use client"

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Preloader } from '@/components/common/Preloader/Preloader'
import { ProfileComponent } from '../Profile'
import { syncProfile, syncUserStatus, updateUserStatus, setPhoto, updateProfileData, Profile } from '@/redux/profileReducer'
import { getProfile, getAuthUserId, getStatus, getIsFetchingProfile } from '@/redux/selectors/selectors'

const ProfileContainer: React.FC<{ params: { userId?: string | null } }>
  = ({ params: { userId: paramIdString } }) => {
    const paramId = paramIdString ? +paramIdString : null
    const router = useRouter()
    const dispatch = useDispatch()
    const authUserId = useSelector(getAuthUserId)
    const userId = paramId || authUserId; // id cannot be `0`

    useEffect(() => {
      if (!userId || isNaN(userId)) {
        if (authUserId) {
          router.push(`/profile/${authUserId}`);
        } else {
          router.push(`/login`);
        }
      }
    }, [paramId, authUserId, router])

    if (!userId || isNaN(userId)) {
      return <></>;
    }

    const profile = useSelector(getProfile(userId))
    const status = useSelector(getStatus)
    const isFetching = useSelector(getIsFetchingProfile)

    useEffect(() => {
        dispatch(syncProfile({ userId }))
        dispatch(syncUserStatus({ userId }))
    }, [userId, authUserId, dispatch])

    return profile && !isFetching ? (
      <ProfileComponent
        profile={profile}
        status={status}
        isOwner={profile.userId == authUserId}
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

