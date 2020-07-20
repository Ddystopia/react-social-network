import React from 'react'
import classNames from './MyPosts.module.css'
import Post from './Post/Post'
import Form from './Form/Form'

const MyPosts = ({ data, addPost, isOwner }) => {
  const postMessages = data.map((item) => <Post {...item} key={item.id} />).reverse()

  const addPostHandle = (message) => {
    addPost(message)
  }

  return (
    <div className={classNames.posts}>
      <h2>Posts</h2>
      {isOwner && <Form addPost={addPostHandle} />}
      <section>{postMessages}</section>
    </div>
  )
}
export default MyPosts
