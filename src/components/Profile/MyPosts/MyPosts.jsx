import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from './MyPosts.module.css'
import { addPost } from '../../../redux/profileReducer'
import { getAvatarSmall, getPosts } from '../../../redux/selectors/selectors'
import { Post } from './Post/Post'
import { Form } from './Form/Form'
import { useDispatch, useSelector } from 'react-redux'

export const MyPosts = ({ isOwner }) => {
  const data = useSelector(getPosts)
  const avatar = useSelector(getAvatarSmall)
  const postMessages = data.map(item => <Post {...item} avatar={avatar} key={item.id} />).reverse()

  const dispatch = useDispatch()
  const addPostHandle = useCallback(message => dispatch(addPost(message)), [dispatch])

  return (
    <div className={classNames.posts}>
      <h2>Posts</h2>
      {isOwner && <Form addPost={addPostHandle} />}
      <section>{ isOwner ? postMessages : <div>API does not supports posts</div>}</section>
    </div>
  )
}
MyPosts.propTypes = {
  isOwner: PropTypes.bool.isRequired,
}
