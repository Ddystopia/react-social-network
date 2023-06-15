import React, { ChangeEvent } from 'react';
import classNames from './Users.module.css';
import { UserComponent } from './User/User';
import { Pagination } from './Pagination/Pagination';
import { User } from '@/redux/usersReducer';

const MIN_COUNT = 2;

interface UsersProps {
  usersData: User[];
  isFollowing: number[];
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  usersCount: number;
  pageCount: number;
  page: number;
  changePage: (pageNumber: number) => void;
  setPageCount: (count: number) => void;
}

export const Users: React.FC<UsersProps> = ({
  usersData,
  isFollowing,
  follow,
  unFollow,
  usersCount,
  pageCount,
  page,
  changePage,
  setPageCount,
}) => {
  const users = usersData.map((u) => (
    <UserComponent
      key={u.id}
      disabled={isFollowing.includes(u.id)}
      id={u.id}
      data={u}
      follow={follow}
      unFollow={unFollow}
    />
  ));

  const onSetPageCount = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageCount(Number(event.target.value));
  };

  return (
    <section className={classNames.content}>
      <div className={classNames.navWrapper}>
        <Pagination
          itemsCount={usersCount}
          pageSize={pageCount}
          page={page}
          changePage={changePage}
        />
        <select onChange={onSetPageCount} value={pageCount}>
          {new Array(7).fill(null).map((_, i) => (
            <option value={i + MIN_COUNT} key={i + MIN_COUNT}>
              {i + MIN_COUNT}
            </option>
          ))}
        </select>
      </div>
      <ul className={classNames.usersList}>{users}</ul>
    </section>
  );
};
