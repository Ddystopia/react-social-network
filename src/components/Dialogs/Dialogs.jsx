import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from './Dialogs.module.css'
import { Chats } from './Chats/Chats'
import { Messages } from './Messages/Messages'

export const Dialogs = ({
  chatsData,
  messagesData,
  messageActions,
  chatActions,
  haveChats,
  newMessagesCount,
}) => {
  const [deletedMessagesPage, setDeletedMessagesPage] = useState(false)

  const button = deletedMessagesPage ? (
    <button onClick={() => setDeletedMessagesPage(false)}>To messages</button>
  ) : (
    <button onClick={() => setDeletedMessagesPage(true)}>To deleted messages</button>
  )

  return (
    <section className={classNames.content}>
      {button}
      <Chats data={chatsData} chatActions={chatActions} newMessagesCount={newMessagesCount} />
      <Messages
        data={messagesData}
        messageActions={messageActions}
        haveChats={haveChats}
        isBin={deletedMessagesPage}
      />
    </section>
  )
}

Dialogs.propTypes = {
  chatsData: PropTypes.array.isRequired,
  messagesData: PropTypes.array.isRequired,
  messageActions: PropTypes.object.isRequired,
  chatActions: PropTypes.object.isRequired,
  haveChats: PropTypes.bool.isRequired,
  newMessagesCount: PropTypes.number.isRequired,
}
