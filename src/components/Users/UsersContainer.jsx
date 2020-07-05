import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { getUsers, follow, unFollow, setCount } from '../../redux/usersReducer'
import { compose } from 'redux'
import {
  getUsersData,
  getUsersPage,
  getUsersPageCount,
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
  setCount,
}) => {
  useEffect(() => {
    if (data.length === 0 && !isFetching) getUsers(page, pageCount)
  }, [data.length, getUsers, isFetching, page, pageCount])
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
      setPageCount={setCount}
    />
  )
}

const mapStateToProps = (state) => ({
  data: getUsersData(state),
  page: getUsersPage(state),
  pageCount: getUsersPageCount(state),
  usersCount: getUsersCount(state),
  isFetching: getIsFetchingUserData(state),
  isFollowing: getIsFollowing(state),
})

const mapDispatchToProps = { getUsers, follow, unFollow, setCount }

export default compose(connect(mapStateToProps, mapDispatchToProps))(UsersContainer)
