import React, { useEffect } from 'react'
import classNames from './Chats.module.css'
import ChatListItem from './ChatListItem/ChatListItem'
import Swal from 'sweetalert2'

const Chats = ({ data, chatActions, newMessagesCount }) => {
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
    else Swal.fire('Invalid id', '', 'error')
  }

  const listItems = data.map((item) => (
    <ChatListItem key={item.id} {...item} onClick={() => getMessages(item.id)} />
  ))
  return (
    <section className={classNames.chats}>
      <header>
        <h2>Chats</h2>{' '}
        <div className={classNames.newChat} onClick={onNewChatClick}>
          <span>+</span>
        </div>
      </header>
      <ul>{listItems}</ul>
    </section>
  )
}

export default Chats
