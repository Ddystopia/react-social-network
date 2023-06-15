'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getAuthUserId } from '@/redux/selectors/selectors';

export default () => {
  const router = useRouter();
  const authUserId = useSelector(getAuthUserId);

  useEffect(() => {
    if (authUserId) {
      router.push(`/profile/${authUserId}`);
    } else {
      router.push(`/login`);
    }
  }, [authUserId, router]);

  return null;
};
