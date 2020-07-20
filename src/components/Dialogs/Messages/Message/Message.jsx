import React, { useState, useEffect } from 'react'
import classNames from './Message.module.css'
import CMClassNames from './ContextMenu.module.css'
import standardAvatar from '../../../../assets/images/standardAvatar.jpg'

const Message = ({ data, profile, classEnd, removeMessage, restoreMessage }) => {
  const date = calcDate(data.addedAt)
  const messageClassName = getClassName('message', classEnd)
  const dateClassName = getClassName('date', classEnd)
  const viewedClassName = getClassName('viewed', classEnd)

  const contextMenuRef = React.createRef()
  const [hidden, setHidden] = useState(true)
  let buttonPressTimer

  const openContextMenu = (e) => {
    e.preventDefault()
    setHidden(false)
    const contextMenu = contextMenuRef.current
    contextMenu.style.left = e.clientX + 'px'
    contextMenu.style.top = e.clientY + 'px'
  }
  useEffect(() => {
    hidden || contextMenuRef.current.focus()
  })
  const handleButtonPress = (e) => {
    buttonPressTimer = setTimeout(() => openContextMenu(e), 1500)
  }

  const handleButtonRelease = () => {
    clearTimeout(buttonPressTimer)
  }

  return (
    <article className={messageClassName}>
      <img alt="avatar" src={profile.photos.small || standardAvatar} />
      <div
        className={classNames.content}
        onContextMenu={openContextMenu}
        onTouchStart={handleButtonPress}
        onTouchEnd={handleButtonRelease}
      >
        <p>{data.body}</p>
        <div className={dateClassName}>{date}</div>
        {data.viewed && <div className={viewedClassName}>👁</div>}
      </div>
      <div
        className={CMClassNames.contextMenu}
        ref={contextMenuRef}
        onBlur={() => setHidden(true)}
        hidden={hidden}
        tabIndex="-1"
      >
        <ul>
          {data.deletedBySender ? (
            <li onClick={() => restoreMessage(data)}>Restore self</li>
          ) : (
            <li onClick={() => removeMessage(data)}>Remove self</li>
          )}
          <li>{data.viewed ? 'Viewed' : 'Not viewed'}</li>
        </ul>
      </div>
    </article>
  )
}

const getClassName = (regularClassName, classEnd) => {
  return `${classNames[regularClassName + classEnd]} ${classNames[regularClassName]}`
}

const calcDate = (date) => {
  const thisDate = new Date()
  const dateObj = {
    y: date.getFullYear(),
    month: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
  }
  for (const item in dateObj) {
    let elem = dateObj[item]
    if (elem < 10) elem = `0${elem}`
  }
  let resDate = []

  if (thisDate.getDate() !== dateObj.d) {
    if (thisDate - date < 1 * 24 * 3600 * 1000) resDate.push('Yesterday')
    else resDate.push(`${dateObj.y}-${dateObj.month}-${dateObj.d}`)
  }
  resDate.push(`${dateObj.h}:${dateObj.m}`)
  return resDate.join(' / ')
}

export default Message
