import React, { FC, useState } from 'react'
import classNames from './Dialogs.module.css'
import { ChatData, Chats } from './Chats/Chats'
import { Messages } from './Messages/Messages'
import { MessageData } from '@/redux/dialogReducer'
import { Profile } from '@/redux/profileReducer'

export const Dialogs: FC<Props> = ({
  chatsData,
  messagesData,
  messageActions,
  chatActions,
  newMessagesCount,
  profile,
  elseProfile,
  isFetching,
  lastCheck,
  currentDialogId
}) => {
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

type Props = {
  chatsData: Array<ChatData>
  messagesData: Array<MessageData>
  isBin?: boolean
  profile: Profile | null
  elseProfile: Profile | null
  isFetching: boolean
  currentDialogId: number | null
  lastCheck: Date
  messageActions: {
    getNewMessages: (userId: number, lastCheck: Date) => void
    sendMessage: (message: string) => void,
    removeMessage: (message: MessageData) => void,
    restoreMessage: (message: MessageData) => void,
  }
  chatActions: {
    getAllDialogs: () => void
    createNewChat: (id: number) => void
    getMessages: (id: number) => void
    setCurrentDialogId: (id: number) => void
    getNewMessagesCount: () => void
  }
  newMessagesCount: number
}

