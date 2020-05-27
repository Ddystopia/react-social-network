import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { getUsers, follow, unFollow } from '../../redux/usersReducer'
import { compose } from 'redux'
import {
  getUsersData,
  getPage,
  getPageCount,
  getUsersCount,
  getIsFetchingUserData,
  getIsFollowing,
} from '../../redux/selectors/selectors'

const UsersContainer = ({
  data,
  page,
  pageCount,
  usersCount,
  getUsers,
  isFetching,
  isFollowing,
  follow,
  unFollow,
}) => {
  useEffect(() => {
    if (data.length === 0) getUsers(page, pageCount)
  })
  const changePage = (p) => getUsers(p, pageCount)

  return isFetching ? (
    <Preloader />
  ) : (
    <Users
      data={data}
      page={page}
      pageCount={pageCount}
      usersCount={usersCount}
      isFollowing={isFollowing}
      follow={follow}
      unFollow={unFollow}
      changePage={changePage}
    />
  )
}

const mapStateToProps = (state) => ({
  data: getUsersData(state),
  page: getPage(state),
  pageCount: getPageCount(state),
  usersCount: getUsersCount(state),
  isFetching: getIsFetchingUserData(state),
  isFollowing: getIsFollowing(state),
})

const mapDispatchToProps = { getUsers, follow, unFollow }

export default compose(connect(mapStateToProps, mapDispatchToProps))(UsersContainer)
