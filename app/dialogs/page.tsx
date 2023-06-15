"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getChatsData, getCurrentDialogId, getNewMessagesCountSelector } from '@/redux/selectors/selectors'
import { createNewChat, getAllDialogs, getMessages, getNewMessagesCount, initalizeDialogs, setCurrentDialogId } from '@/redux/dialogReducer'
import { Chats } from './Chats/Chats'
import classNames from './Dialogs.module.css'

export default function Dialogs() {
  const router = useRouter()
  const currentDialogId = useSelector(getCurrentDialogId);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initalizeDialogs())
  }, [])

  useEffect(() => {
    if (currentDialogId) {
      router.push(`/dialogs/${currentDialogId}`)
    }
  }, [currentDialogId])

  const chatsData = useSelector(getChatsData);
  const newMessagesCount = useSelector(getNewMessagesCountSelector);

  if (currentDialogId) {
    return null
  }

  const chatActions = {
    getAllDialogs: () => dispatch(getAllDialogs),
    createNewChat: () => dispatch(createNewChat),
    getMessages: () => dispatch(getMessages),
    setCurrentDialogId: () => dispatch(setCurrentDialogId),
    getNewMessagesCount: () => dispatch(getNewMessagesCount),
  };

  return (
    <section className={classNames.content}>
      <Chats
        data={chatsData}
        chatActions={chatActions}
        newMessagesCount={newMessagesCount}
      />
    </section>
  )
}


