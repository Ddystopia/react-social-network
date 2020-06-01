import React, { useEffect } from 'react'
import Message from './Message/Message'
import classNames from './Messages.module.css'
import SendForm from './SendForm/SendForm'
import empty from '../../../assets/images/mailbox-empty.svg'
import { connect } from 'react-redux'
import { getProfile, getDialogFriendProfile } from '../../../redux/selectors/selectors'

const Messages = ({ data, messageActions, haveChats, profile, elseProfile }) => {
  const {
    sendMessage,
    // getNewMessagesCount,
    // checkIsViewed,
    removeMessage,
    // restoreMessage,
  } = messageActions
  const messagesDiv = React.createRef()
	const messages = data
		.filter(item => !item.deletedBySender)
    .map((item) => ({ ...item, addedAt: new Date(item.addedAt) }))
    .sort((a, b) => a.addedAt - b.addedAt)
    .slice(0, Math.min(data.length, 100))
    .map((item) => {
      const self = profile.userName === item.userName
      return (
        <Message
          key={item.id}
          data={item}
          classEnd={self ? 'Self' : 'Else'}
          profile={self ? profile : elseProfile}
          removeMessage={removeMessage}
        />
      )
    })

  useEffect(() => {
    const element = messagesDiv.current
    element.scrollTop = element.scrollHeight
  })

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
      {haveChats && <SendForm sendMessage={sendMessage} />}
    </section>
  )
}

export default connect(
  (state) => ({
    profile: getProfile(state),
    elseProfile: getDialogFriendProfile(state),
  }),
  {}
)(Messages)
