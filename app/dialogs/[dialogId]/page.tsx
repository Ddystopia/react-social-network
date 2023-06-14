"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { withAuthRedirect } from '@/hoc/withAuthRedirect'
import { connect, ConnectedProps, useDispatch } from 'react-redux'
import { AppState } from '@/redux/store'
import classNames from '../Dialogs.module.css'
import { Chats } from '../Chats/Chats'
import {
  getAllDialogs,
  createNewChat,
  getMessages,
  getNewMessages,
  sendMessage,
  checkIsViewed,
  removeMessage,
  restoreMessage,
  setCurrentDialogId,
  getNewMessagesCount,
  MessageData
} from '@/redux/dialogReducer'

import {
  getAuthProfile,
  getMessagesData,
  getNewMessagesCountSelector,
  getDialogFriendProfile,
  getIsFetchingMessages,
  getChatsData,
  getCurrentDialogId,
  getLastCheck,
} from '@/redux/selectors/selectors'
import { Messages } from '../Messages/Messages'

type PropsFromRedux = ConnectedProps<typeof connector>

const DialogsContainer: React.FC<DialogsContainerProps> = ({
  chatsData,
  messagesData,
  getAllDialogs,
  createNewChat,
  getMessages,
  sendMessage,
  removeMessage,
  restoreMessage,
  newMessagesCount,
  getNewMessagesCount,
  setCurrentDialogId,
  currentDialogId,
  profile,
  elseProfile,
  isFetching,
  lastCheck,
  params: { dialogId: paramId },
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const dialogId = Number(paramId)

  const chatActions = {
    getAllDialogs,
    createNewChat,
    getMessages,
    setCurrentDialogId,
    getNewMessagesCount,
  };

  const messageActions = {
    sendMessage: (message: string) => {
      if (!isNaN(dialogId)) {
        dispatch(() => sendMessage({ userId: dialogId, message }))
      }
    },
    getMessages: (userId: number) => dispatch(getMessages(userId)),
    removeMessage: (message: MessageData) => dispatch(() => removeMessage(message)),
    restoreMessage: (message: MessageData) => dispatch(() => restoreMessage(message)),
    getNewMessages: (userId: number, lastCheck: Date) => {
      dispatch(getNewMessages({ userId, lastCheck }))
    },
  }

  useEffect(() => {
    if (dialogId !== currentDialogId) {
      if (isNaN(dialogId) && currentDialogId) {
        router.push(`/dialogs/${currentDialogId}`)
      } else if (!isNaN(dialogId)) {
        setCurrentDialogId(dialogId)
      }
    }
  }, [currentDialogId, dialogId])

  const [deletedMessagesPage, setDeletedMessagesPage] = useState(false)

  const button = <button onClick={() => setDeletedMessagesPage(it => !it)}>
    {deletedMessagesPage ?
      "To messages" :
      "To deleted messages"}
  </button>

  return (
    <section className={classNames.content}>
      {button}
      <Chats
        data={chatsData}
        chatActions={chatActions}
        newMessagesCount={newMessagesCount}
      />
      <Messages
        data={messagesData}
        messageActions={messageActions}
        isBin={deletedMessagesPage}
        profile={profile}
        elseProfile={elseProfile}
        isFetching={isFetching}
        lastCheck={lastCheck}
        chatsData={chatsData}
        currentDialogId={currentDialogId}
      />
    </section>
  )
}

interface DialogsContainerProps extends PropsFromRedux {
  messagesData: MessageData[]
  newMessagesCount: number
  params: {
    dialogId: number
  }
}

const mapStateToProps = (state: AppState) => ({
  chatsData: getChatsData(state),
  messagesData: getMessagesData(state),
  currentDialogId: getCurrentDialogId(state),
  newMessagesCount: getNewMessagesCountSelector(state),
  profile: getAuthProfile(state),
  elseProfile: getDialogFriendProfile(state),
  isFetching: getIsFetchingMessages(state),
  lastCheck: getLastCheck(state),
})

const mapDispatchToProps = {
  getAllDialogs,
  createNewChat,
  getMessages,
  sendMessage,
  checkIsViewed,
  removeMessage,
  restoreMessage,
  getNewMessagesCount,
  setCurrentDialogId,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(withAuthRedirect(DialogsContainer))
