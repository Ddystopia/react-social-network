'use client';

import React, { useEffect, ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { getIsAuth } from '@/redux/selectors/selectors';
import { useRouter } from 'next/navigation';

interface WithAuthProps {}

export const withAuthRedirect = <P extends object>(Component: ComponentType<P>) => {
  const RedirectComponent: React.FC<P & WithAuthProps> = (props) => {
    const isAuth = useSelector(getIsAuth);
    const router = useRouter();

    useEffect(() => {
      if (!isAuth) {
        router.push('/login');
      }
    }, [isAuth, router]);

    if (!isAuth) {
      return null;
    }

    return <Component {...(props as P)} />;
  };

  return RedirectComponent;
};
