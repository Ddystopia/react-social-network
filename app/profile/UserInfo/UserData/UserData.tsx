import React, { useState, useEffect, ChangeEvent } from 'react';
import classNames from './UserData.module.css';
import { Profile } from '@/redux/profileReducer';

export const UserData: React.FC<Props> = ({ propStatus, profile, updateUserStatus, isOwner }) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(propStatus);
  useEffect(() => {
    setStatus(propStatus);
  }, [propStatus]);

  const statusOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setStatus(e.target.value);
  };

  const anabelEditMode = () => {
    if (!isOwner) return;
    setEditMode(true);
  };

  const disableEditMode = () => {
    setEditMode(false);
    if (propStatus !== status) updateUserStatus(status || '');
  };

  return (
    <article className={classNames.user_info_text}>
      <h3>{profile.fullName || '-----'}</h3>
      <div>About me: {profile.aboutMe || '-----'}</div>
      <div className={classNames.statusContainer}>
        Status:
        {editMode ? (
          <div className={classNames.textarea}>
            <textarea
              autoFocus={true}
              onBlur={disableEditMode}
              value={status}
              onChange={statusOnChange}
            />
          </div>
        ) : (
          <div
            className={classNames.status}
            title={'Double click to edit'}
            onDoubleClick={anabelEditMode}
          >
            {propStatus || '-----'}
          </div>
        )}
      </div>
      <div>
        Looking for a job:
        <div
          className={classNames.circle}
          style={{
            backgroundColor: profile.lookingForAJob ? 'green' : 'red',
          }}
        ></div>
        {profile.lookingForAJobDescription}
      </div>
    </article>
  );
};

interface Props {
  propStatus: string;
  profile: Profile;
  updateUserStatus: (status: string) => void;
  isOwner: boolean;
}
