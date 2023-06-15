'use client';

import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { Users } from './Users';
import { Preloader } from '@/components/common/Preloader/Preloader';
import { ErrorPage } from '@/components/common/ErrorPage/ErrorPage';
import { getUsers, follow, unFollow, setCount, setPage } from '@/redux/usersReducer';
import { AppState } from '@/redux/store';
import { compose } from 'redux';
import {
  getUsersData,
  getUsersPage,
  getUsersPageCount,
  getUsersCount,
  getIsFetchingUserData,
  getIsFollowing,
  getUsersError,
} from '../../redux/selectors/selectors';

const mapStateToProps = (state: AppState) => ({
  usersData: getUsersData(state),
  page: getUsersPage(state),
  pageCount: getUsersPageCount(state),
  usersCount: getUsersCount(state),
  isFetching: getIsFetchingUserData(state),
  isFollowing: getIsFollowing(state),
  hasError: getUsersError(state),
});

const mapDispatchToProps = { getUsers, follow, unFollow, setCount };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const UsersContainer: React.FC<PropsFromRedux> = ({
  usersData,
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
    if (usersData.length === 0 && !isFetching && !hasError) {
      getUsers({ page, count: pageCount });
    }
  }, [usersData, getUsers, hasError, isFetching, page, pageCount]);
  const dispatch = useDispatch();

  const changePage = (page: number) => {
    dispatch(setPage(page));
    getUsers({ page, count: pageCount });
  };

  if (isFetching) {
    return <Preloader />;
  }
  if (hasError) {
    return <ErrorPage />;
  }

  return (
    <Users
      usersData={usersData}
      page={page}
      pageCount={pageCount}
      usersCount={usersCount}
      isFollowing={isFollowing}
      follow={follow}
      unFollow={unFollow}
      changePage={changePage}
      setPageCount={setCount}
    />
  );
};

export default compose(connector)(UsersContainer);
