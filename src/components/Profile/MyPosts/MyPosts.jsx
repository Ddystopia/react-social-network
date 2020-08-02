import React, { useCallback } from 'react'
import classNames from './MyPosts.module.css'
import { addPost } from '../../../redux/profileReducer'
import { getPosts } from '../../../redux/selectors/selectors'
import { Post } from './Post/Post'
import { Form } from './Form/Form'
import { useDispatch, useSelector } from 'react-redux'

export const MyPosts = ({ isOwner }) => {
  const data = useSelector(getPosts)
  const postMessages = data.map((item) => <Post {...item} key={item.id} />).reverse()

  const dispatch = useDispatch()
  const addPostHandle = useCallback((message) => dispatch(addPost(message)), [dispatch])

  return (
    <div className={classNames.posts}>
      <h2>Posts</h2>
      {isOwner && <Form addPost={addPostHandle} />}
      <section>{postMessages}</section>
    </div>
  )
}
