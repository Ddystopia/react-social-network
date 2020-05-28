import React, { useEffect } from 'react'
import Message from './Message/Message'
import classNames from './Messages.module.css'
import SendForm from './SendForm/SendForm'

export default ({ data, sendMessage }) => {
  const messagesDiv = React.createRef()
  const messages = data
    .sort((a, b) => a.date - b.date)
    .slice(0, Math.min(data.length, 100))
    .map((item) => <Message key={item.id} data={item} />)
  useEffect(() => {
    const element = messagesDiv.current
    element.scrollTop = element.scrollHeight
  })
  return (
    <section className={classNames.content}>
      <div ref={messagesDiv} className={classNames.messages}>
        {messages}
      </div>
      <SendForm sendMessage={sendMessage} />
    </section>
  )
}
