import React, { useState } from 'react'
import classNames from './Dialogs.module.css'
import Chats from './Chats/Chats'
import Messages from './Messages/Messages'

const Dialogs = ({ chatsData, messagesData, messageActions, chatActions, haveChats, login, newMessagesCount }) => {
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
        login={login}
        haveChats={haveChats}
        isBin={deletedMessagesPage}
      />
    </section>
  )
}
export default Dialogs
