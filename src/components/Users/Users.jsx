import React from 'react'
import classNames from './Users.module.css'
import User from './User/User'
import Pagination from './Pagination/Pagination'

const Users = ({
  data,
  isFollowing,
  follow,
  unFollow,
  usersCount,
  pageCount,
  page,
  changePage,
}) => {
  const users = data.map((u) => (
    <User
      key={u.id}
      disabled={isFollowing.includes(u.id)}
      id={u.id}
      data={u}
      follow={follow}
      unFollow={unFollow}
    />
  ))

  return (
    <section className={classNames.content}>
      <Pagination
        itemsCount={usersCount}
        pageSize={pageCount}
        page={page}
        changePage={changePage}
      />
      <ul className={classNames.usersList}>{users}</ul>
    </section>
  )
}

export default Users
