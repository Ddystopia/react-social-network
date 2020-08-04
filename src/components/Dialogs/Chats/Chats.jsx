import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from './Chats.module.css'
import { ChatListItem } from './ChatListItem/ChatListItem'
import Swal from 'sweetalert2'

export const Chats = ({ data, chatActions, newMessagesCount }) => {
  const {
    getAllDialogs,
    createNewChat,
    getMessages,
    setCurrentDialogId,
    getNewMessagesCount,
  } = chatActions

  const firstElemId = data[0]?.id
  useEffect(() => {
    getAllDialogs()
    getMessages(+firstElemId)
    setCurrentDialogId(+firstElemId)
  }, [firstElemId, getAllDialogs, getMessages, setCurrentDialogId])

  useEffect(() => {
    if (newMessagesCount > 0) getAllDialogs()
    const checkNMC = setInterval(() => getNewMessagesCount(), 10000)
    return () => clearInterval(checkNMC)
  }, [getAllDialogs, getNewMessagesCount, newMessagesCount])

  const onNewChatClick = async () => {
    const { value: id } = await Swal.fire({
      title: 'Who to start a dialogue with?',
      text: 'Type user id',
      input: 'number',
      inputPlaceholder: '1234',
      icon: 'question',
    })
    if (+id > 0) createNewChat(id)
    else if (id) Swal.fire('Invalid id', '', 'error')
  }

  const listItems = data.map(item => (
    <ChatListItem key={item.id} {...item} onClick={() => getMessages(item.id)} />
  ))
  return (
    <section className={classNames.chats}>
      <header>
        <h2>Chats</h2>{' '}
        <button className={classNames.newChat} onClick={onNewChatClick} aria-label="New chat">
          <span>+</span>
        </button>
      </header>
      <ul>{listItems}</ul>
    </section>
  )
}
Chats.propTypes = {
  data: PropTypes.array.isRequired,
  chatActions: PropTypes.object.isRequired,
  newMessagesCount: PropTypes.number.isRequired,
}
