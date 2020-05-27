import React from 'react'
import classNames from './Post.module.css'
import standardAvatar from '../../../../assets/images/standardAvatar.jpg'

const Post = ({ header, message }) => {
  return (
    <article className={classNames.post}>
      <img src={standardAvatar} alt="avatar" />
      <div className={classNames.messageObj}>
        <h4> {header} </h4>
        <p> {message} </p>
      </div>
    </article>
  )
}
export default Post
