"use client"

import React, { useCallback } from 'react'
import classNames from './MyPosts.module.css'
import { addPost } from '../../../redux/profileReducer'
import { Post as PostType } from '../../../redux/profileReducer'
import { getAvatarSmall, getPosts } from '../../../redux/selectors/selectors'
import { Post } from './Post/Post'
import { SendForm } from './Form/Form'
import { useDispatch, useSelector } from 'react-redux'

export const MyPosts: React.FC<Props> = ({ isOwner }) => {
  const data = useSelector(getPosts)
  const avatar = useSelector(getAvatarSmall)
  const postMessages = data.map((item: PostType) => <Post {...item} avatar={avatar} key={item.id} />).reverse()

  const dispatch = useDispatch()
  const addPostHandle = useCallback((message: string) => dispatch(addPost(message)), [dispatch])

  return (
    <div className={classNames.posts}>
      <h2>Posts</h2>
      {isOwner && <SendForm addPost={addPostHandle} />}
      <section>{isOwner ? postMessages : <div>API does not supports posts</div>}</section>
    </div>
  )
}

interface Props {
  isOwner: boolean
}
