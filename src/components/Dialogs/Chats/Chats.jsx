import React from 'react'
import classNames from './Chats.module.css'
import ChatListItem from './ChatListItem/ChatListItem'

const Chats = ({ data }) => {
  const listItems = data.map((item) => <ChatListItem key={item.id} {...item} />)
  return (
    <section className={classNames.chats}>
      <h2>Chats</h2>
      <ul>{listItems}</ul>
    </section>
  )
}

export default Chats
