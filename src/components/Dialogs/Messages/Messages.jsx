import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Message } from './Message/Message'
import classNames from './Messages.module.css'
import { Form } from './SendForm/SendForm'
import empty from '../../../assets/images/mailbox-empty.svg'
import { connect } from 'react-redux'
import { Preloader } from '../../common/Preloader/Preloader'
import { getNewMessages } from '../../../redux/dialogReducer'
import {
  getAuthProfile,
  getDialogFriendProfile,
  getIsFetchingMessages,
  getChatsData,
  getCurrentDialogId,
  getLastCheck,
} from '../../../redux/selectors/selectors'
import { profileSchema } from '../../../redux/profileReducer'

const MessagesContainer = ({
  data,
  messageActions,
  haveChats,
  profile,
  elseProfile,
  isFetching,
  isBin,
  chatsData,
  currentDialogId,
  getNewMessages,
  lastCheck,
}) => {
  const {
    sendMessage,
    removeMessage,
    restoreMessage,
    // checkIsViewed,
  } = messageActions
  useEffect(() => {
    const chat = chatsData.find(item => item.id === currentDialogId)
    if (!chat) return
    if (chat.newMessagesCount > 0) getNewMessages(chat.id, lastCheck)
  }, [chatsData, currentDialogId, getNewMessages, lastCheck])

  useEffect(() => {
    const element = messagesDiv.current
    if (!element) return
    element.scrollTop = element.scrollHeight
  })
  const messagesDiv = React.createRef()
  const messages = data
    .filter(item => isBin === !!item.deletedBySender)
    .map(item => ({ ...item, addedAt: new Date(item.addedAt) }))
    .sort((a, b) => a.addedAt - b.addedAt)
    .slice(0, Math.min(data.length, 100))
    .map(item => {
      const self = profile?.userId === item.senderId
      return (
        <Message
          key={item.id}
          data={item}
          classEnd={self ? 'Self' : 'Else'}
          profile={self ? profile : elseProfile}
          removeMessage={removeMessage}
          restoreMessage={restoreMessage}
        />
      )
    })

  if (isFetching) return <Preloader />

  return (
    <section className={classNames.content}>
      <div ref={messagesDiv} className={classNames.messages}>
        {messages.length ? (
          messages
        ) : (
          <div className={classNames.empty}>
            <img alt="Empty" src={empty} />
            <p>Empty</p>
          </div>
        )}
      </div>
      {haveChats && <Form sendMessage={sendMessage} />}
    </section>
  )
}

export const Messages = connect(
  state => ({
    profile: getAuthProfile(state),
    elseProfile: getDialogFriendProfile(state),
    isFetching: getIsFetchingMessages(state),
    chatsData: getChatsData(state),
    currentDialogId: getCurrentDialogId(state),
    lastCheck: getLastCheck(state),
  }),
  { getNewMessages }
)(MessagesContainer)

MessagesContainer.propTypes = {
  data: PropTypes.array.isRequired,
  messageActions: PropTypes.object.isRequired,
  haveChats: PropTypes.bool.isRequired,
  profile: profileSchema,
  elseProfile: profileSchema,
  isFetching: PropTypes.bool.isRequired,
  isBin: PropTypes.bool.isRequired,
  chatsData: PropTypes.array.isRequired,
  currentDialogId: PropTypes.number,
  getNewMessages: PropTypes.func.isRequired,
  lastCheck: PropTypes.instanceOf(Date).isRequired,
}
