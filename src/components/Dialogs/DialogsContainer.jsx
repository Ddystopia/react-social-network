import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dialogs } from './Dialogs'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getAllDialogs,
  createNewChat,
  getMessages,
  sendMessage,
  checkIsViewed,
  removeMessage,
  restoreMessage,
  setCurrentDialogId,
  getNewMessagesCount,
} from '../../redux/dialogReducer'
import {
  getChatsData,
  getMessagesData,
  getCurrentDialogId,
  getNewMessagesCountSelector,
} from '../../redux/selectors/selectors'

const DialogsContainer = ({
  match,
  history,
  chatsData,
  messagesData,
  getAllDialogs,
  createNewChat,
  getMessages,
  sendMessage,
  checkIsViewed,
  removeMessage,
  restoreMessage,
  newMessagesCount,
  getNewMessagesCount,
  setCurrentDialogId,
  currentDialogId,
}) => {
  const chatActions = {
    getAllDialogs,
    createNewChat,
    getMessages,
    setCurrentDialogId,
    getNewMessagesCount,
  }
  const messageActions = {
    sendMessage: message => {
      sendMessage(+match.params.userId, message)
    },
    getMessages,
    checkIsViewed,
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
      newMessagesCount={newMessagesCount}
    />
  )
}

const mapStateToProps = state => ({
  chatsData: getChatsData(state),
  messagesData: getMessagesData(state),
  currentDialogId: getCurrentDialogId(state),
  newMessagesCount: getNewMessagesCountSelector(state),
})

export default compose(
  connect(mapStateToProps, {
    getAllDialogs,
    createNewChat,
    getMessages,
    sendMessage,
    checkIsViewed,
    removeMessage,
    restoreMessage,
    getNewMessagesCount,
    setCurrentDialogId,
  }),
  withAuthRedirect,
  withRouter
)(DialogsContainer)

DialogsContainer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  chatsData: PropTypes.array.isRequired,
  messagesData: PropTypes.array.isRequired,
  getAllDialogs: PropTypes.func.isRequired,
  createNewChat: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  checkIsViewed: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired,
  restoreMessage: PropTypes.func.isRequired,
  newMessagesCount: PropTypes.number.isRequired,
  getNewMessagesCount: PropTypes.func.isRequired,
  setCurrentDialogId: PropTypes.func.isRequired,
  currentDialogId: PropTypes.number,
}
