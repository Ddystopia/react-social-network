import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Users } from './Users'
import { Preloader } from '../common/Preloader/Preloader'
import { ErrorPage } from '../common/ErrorPage/ErrorPage'
import { getUsers, follow, unFollow, setCount, UsersState } from '@/redux/usersReducer'
import { compose } from 'redux'
import {
  getUsersData,
  getUsersPage,
  getUsersPageCount,
  getUsersCount,
  getIsFetchingUserData,
  getIsFollowing,
  getUsersError,
} from '../../redux/selectors/selectors'

const mapStateToProps = (state: UsersState) => ({
  data: getUsersData(state),
  page: getUsersPage(state),
  pageCount: getUsersPageCount(state),
  usersCount: getUsersCount(state),
  isFetching: getIsFetchingUserData(state),
  isFollowing: getIsFollowing(state),
  hasError: getUsersError(state),
})

const mapDispatchToProps = { getUsers, follow, unFollow, setCount }

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

const UsersContainer: React.FC<PropsFromRedux> = ({
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
  hasError,
}) => {
  useEffect(() => {
    if (data.length === 0 && !isFetching && !hasError) {
      getUsers(page, pageCount)
    }
  }, [data, getUsers, hasError, isFetching, page, pageCount])

  const changePage = (p: number) => getUsers(p, pageCount)

  if (isFetching) {
    return <Preloader />
  }
  if (hasError) {
    return <ErrorPage />
  }

  return (
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

export default compose(connector)(UsersContainer)

