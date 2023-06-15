import React, { FC } from 'react';
import classNames from './Post.module.css';
import standardAvatar from '/public/images/standardAvatar.jpg';

export const Post: FC<Props> = ({ avatar, message }) => {
  return (
    <article className={classNames.post}>
      <img src={avatar || standardAvatar.src} alt="avatar" />
      <div className={classNames.messageObj}>
        <p> {message} </p>
      </div>
    </article>
  );
};

interface Props {
  avatar?: string;
  message: string;
}
