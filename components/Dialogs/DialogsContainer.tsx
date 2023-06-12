import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Dialogs } from './Dialogs'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { connect, ConnectedProps, useDispatch } from 'react-redux'
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

interface DialogsContainerProps extends PropsFromRedux {
  messagesData: MessageData[]
  newMessagesCount: number
}

const mapStateToProps = (state: any) => ({
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

type PropsFromRedux = ConnectedProps<typeof connector>

const DialogsContainer: React.FC<DialogsContainerProps> = ({
  chatsData,
  messagesData,
  getAllDialogs,
  createNewChat,
  getMessages,
  sendMessage,
  // checkIsViewed,
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
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userId = Number(router.query.userId)

  const chatActions = {
    getAllDialogs,
    createNewChat,
    getMessages,
    setCurrentDialogId,
    getNewMessagesCount,
  }

  const messageActions = {
    sendMessage: (message: string) => {
      if (!isNaN(userId)) {
        dispatch(sendMessage({ userId, message }))
      }
    },
    getMessages: (userId: number) => dispatch(getMessages(userId)),
    // checkIsViewed,
    removeMessage: (message: MessageData) => dispatch(removeMessage(message)),
    restoreMessage: (message: MessageData) => dispatch(restoreMessage(message)),
    getNewMessages: (userId: number, lastCheck: Date) => {
      dispatch(getNewMessages({ userId, lastCheck }))
    },
  }

  useEffect(() => {
    if (userId !== currentDialogId) {
      if (isNaN(userId) && currentDialogId) {
        router.push(`/dialogs/${currentDialogId}`)
      } else if (!isNaN(userId)) {
        setCurrentDialogId(userId)
      }
    }
  }, [currentDialogId, userId])

  return (
    <Dialogs
      chatsData={chatsData}
      currentDialogId={currentDialogId}
      messagesData={messagesData}
      chatActions={chatActions}
      messageActions={messageActions}
      // setCurrentDialogId={setCurrentDialogId}
      newMessagesCount={newMessagesCount}
      profile={profile}
      elseProfile={elseProfile}
      isFetching={isFetching}
      lastCheck={lastCheck}
    />
  )
}

export default connector(withAuthRedirect(DialogsContainer))

