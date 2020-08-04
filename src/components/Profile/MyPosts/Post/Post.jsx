import React from 'react'
import PropTypes from 'prop-types'
import classNames from './Post.module.css'
import standardAvatar from '../../../../assets/images/standardAvatar.jpg'

export const Post = ({ message }) => {
  return (
    <article className={classNames.post}>
      <img src={standardAvatar} alt="avatar" />
      <div className={classNames.messageObj}>
        <p> {message} </p>
      </div>
    </article>
  )
}
Post.propTypes = {
  message: PropTypes.string.isRequired,
}
