"use client"

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { getAuthUserId } from '@/redux/selectors/selectors'

const ProfileContainer: React.FC = () => {
  const router = useRouter()
  const authUserId = useSelector(getAuthUserId)

  useEffect(() => {
    if (authUserId) {
      router.push(`/profile/${authUserId}`);
    } else {
      router.push(`/login`);
    }
  }, [authUserId, router])

  return <></>
}

export default ProfileContainer

