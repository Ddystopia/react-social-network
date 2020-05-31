import React from 'react'
import classNames from './Message.module.css'
import standardAvatar from '../../../../assets/images/standardAvatar.jpg'

export default ({ data, profile, classEnd }) => {
  const date = calcDate(data.addedAt)
  const messageClassName = getClassName('message', classEnd)
  const dateClassName = getClassName('date', classEnd)
  const viewedClassName = getClassName('viewed', classEnd)
  return (
    <article className={messageClassName}>
      <img alt="avatar" src={profile.photos.small || standardAvatar} />
      <div className={classNames.content}>
        {data.body}
        <div className={dateClassName}>{date}</div>
        {data.viewed && <div className={viewedClassName}>👁</div>}
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
