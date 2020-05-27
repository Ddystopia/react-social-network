import React from 'react'
import classNames from './Message.module.css'
import classNamesSelf from './MessageSelf.module.css'
import classNamesElse from './MessageElse.module.css'
import standardAvatar from '../../../../assets/images/standardAvatar.jpg'

export default ({ data }) => {
  const date = calcDate(data.date)
  return (
    <article className={data.self ? classNamesSelf.message : classNamesElse.message}>
      <img alt="avatar" src={standardAvatar} />
      <div className={classNames.content}>
        {data.message}
        <div className={data.self ? classNamesSelf.date : classNamesElse.date}>{date}</div>
      </div>
    </article>
  )
}

const calcDate = (date) => {
  const thisDate = new Date()
  const dateObj = {
    y: date.getFullYear(),
    month: date.getMonth(),
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
    if (
      thisDate.getDate() - +dateObj.d === 1 &&
      thisDate.getMonth() === +dateObj.month &&
      thisDate.getFullYear() === +dateObj.y
    )
      resDate.push('Yesterday')
    else resDate.push(`${dateObj.y}-${dateObj.month}-${dateObj.d}`)
  }
  resDate.push(`${dateObj.h}:${dateObj.m}`)
  return resDate.join(' / ')
}
