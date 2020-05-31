import React from 'react'
import classNames from './Dialogs.module.css'
import Chats from './Chats/Chats'
import Messages from './Messages/Messages'

const Dialogs = ({ chatsData, messagesData, messageActions, chatActions, haveChats, login }) => {
  return (
    <section className={classNames.content}>
      <Chats data={chatsData} chatActions={chatActions} />
      <Messages
        data={messagesData}
        messageActions={messageActions}
        login={login}
        haveChats={haveChats}
      />
    </section>
  )
}
export default Dialogs
