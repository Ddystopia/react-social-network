import React from 'react'
import PropTypes from 'prop-types'
import classNames from './Users.module.css'
import { User } from './User/User'
import { Pagination } from './Pagination/Pagination'
const MIN_COUNT = 2

export const Users = ({
  data,
  isFollowing,
  follow,
  unFollow,
  usersCount,
  pageCount,
  page,
  changePage,
  setPageCount,
}) => {
  const users = data.map(u => (
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
      <div className={classNames.navWrapper}>
        <Pagination
          itemsCount={usersCount}
          pageSize={pageCount}
          page={page}
          changePage={changePage}
        />
        <select
          onChange={e => {
            setPageCount(e.target.value)
          }}
          value={pageCount}
        >
          {new Array(7).fill(null).map((item, i) => (
            <option value={i + MIN_COUNT} key={i + MIN_COUNT}>
              {i + MIN_COUNT}
            </option>
          ))}
        </select>
      </div>
      <ul className={classNames.usersList}>{users}</ul>
    </section>
  )
}

Users.propTypes = {
  data: PropTypes.array.isRequired,
  isFollowing: PropTypes.array.isRequired,
  follow: PropTypes.func.isRequired,
  unFollow: PropTypes.func.isRequired,
  usersCount: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  setPageCount: PropTypes.func.isRequired,
}
