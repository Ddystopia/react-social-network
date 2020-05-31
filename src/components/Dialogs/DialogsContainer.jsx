import React, { useEffect } from 'react'
import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getAllDialogs,
  createNewChat,
  getMessages,
  getNewMessagesCount,
  sendMessage,
  checkIsViewed,
  messageToSpam,
  removeMessage,
  restoreMessage,
  setCurrentDialogId,
} from '../../redux/dialogReducer'
import {
  getChatsData,
  getMessagesData,
  getCurrentDialogId,
  getLogin,
} from '../../redux/selectors/selectors'

const DialogsContainer = ({
  match,
  history,
  chatsData,
  messagesData,
  getAllDialogs,
  createNewChat,
  getMessages,
  getNewMessagesCount,
  sendMessage,
  checkIsViewed,
  messageToSpam,
  removeMessage,
  restoreMessage,
  setCurrentDialogId,
  currentDialogId,
}) => {
  const chatActions = { getAllDialogs, createNewChat, getMessages, setCurrentDialogId }
  const messageActions = {
    getNewMessagesCount,
    sendMessage: (message) => {
      sendMessage(+match.params.userId, message)
    },
    checkIsViewed,
    messageToSpam,
    removeMessage,
    restoreMessage,
  }

  useEffect(() => {
    const userId = +match.params.userId
    if (userId !== currentDialogId) {
      if (isNaN(userId) && +currentDialogId) {
        history.push(`/dialogs/${currentDialogId}`)
      } else if (!isNaN(userId)) {
        setCurrentDialogId(userId)
      }
    }
  })

  return (
    <Dialogs
      chatsData={chatsData}
      messagesData={messagesData}
      chatActions={chatActions}
      messageActions={messageActions}
      haveChats={!!currentDialogId ?? false}
      setCurrentDialogId={setCurrentDialogId}
    />
  )
}

const mapStateToProps = (state) => ({
  chatsData: getChatsData(state),
  messagesData: getMessagesData(state),
  currentDialogId: getCurrentDialogId(state),
})

export default compose(
  connect(mapStateToProps, {
    getAllDialogs,
    createNewChat,
    getMessages,
    getNewMessagesCount,
    sendMessage,
    checkIsViewed,
    messageToSpam,
    removeMessage,
    restoreMessage,
    setCurrentDialogId,
  }),
  withAuthRedirect,
  withRouter
)(DialogsContainer)
