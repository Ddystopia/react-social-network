'use client';

import { initializeApp } from '@/redux/appReducer';
import { getInitialized } from '@/redux/selectors/selectors';
import { errorHandler } from '@/utils/errorHandlers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Initialized({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const initialized = useSelector(getInitialized);

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeApp());
    }
  }, [dispatch, initialized]);

  const handler = (e: PromiseRejectionEvent) => errorHandler(e.reason);

  useEffect(() => {
    window.addEventListener('unhandledrejection', handler);
    return window.removeEventListener('unhandledrejection', handler);
  });

  return children;
}
