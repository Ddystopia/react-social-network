"use client"

import { initializeApp } from "@/redux/appReducer"
import { getInitialized } from "@/redux/selectors/selectors"
import { errorHandler } from "@/utils/errorHandlers"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export function Initialized({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const initialized = useSelector(getInitialized)

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeApp())
    }
  }, [dispatch, initialized])

  useEffect(() => {
    window.addEventListener('unhandledRejection', errorHandler)
    return window.removeEventListener('unhandledRejection', errorHandler)
  })

  return children
}
