import React, { FC } from 'react';
import classNames from './ChatListItem.module.css';
import Link from 'next/link';

export const ChatListItem: FC<Props> = ({ userName, id, onClick, newMessagesCount, active }) => {
  return (
    <li className={classNames.li} onClick={onClick}>
      <Link className={active ? classNames.active : ''} href={`/dialogs/${id}`}>
        <p>{userName}</p>
        {newMessagesCount > 0 && (
          <div className={classNames.newMessagesCount}>{newMessagesCount}</div>
        )}
      </Link>
    </li>
  );
};

type Props = {
  userName: string;
  id: number;
  onClick: () => void;
  newMessagesCount: number;
  active: boolean;
};
