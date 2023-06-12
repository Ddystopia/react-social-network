import React, { ChangeEvent, useState } from 'react'
import classNames from './UserInfo.module.css'
import standardAvatar from '/public/images/standardAvatar.jpg'
import { UserData } from './UserData/UserData'
import { SendForm } from './Form/Form'
import { Profile, Contacts } from '../../../redux/profileReducer'

export const UserInfo = ({ profile, updateUserStatus, status, isOwner, setPhoto, setProfile }: Props) => {
  const [editMode, setEditMode] = useState(false)

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    if (target.files?.length) setPhoto(target?.files[0])
  }

  const cloneWithNullToEmpty = (elem: any) => {
    if (elem === null) return ''
    else if (typeof elem !== 'object') return elem
    else {
      const newElem = { ...elem }
      for (let [key, value] of Object.entries(newElem)) {
        newElem[key] = cloneWithNullToEmpty(value)
      }
      return newElem
    }
  }
  const initialValues = cloneWithNullToEmpty(profile)

  return (
    <section className={classNames.user_info}>
      <article className={classNames.avatar}>
        <img src={profile.photos.small ?? standardAvatar.src} alt="Avatar" />
        <div className={classNames.filepicker}>
          {isOwner && <input type="file" onChange={onChangeFile} value={''} />}
        </div>
      </article>
      {editMode ? (
        <SendForm
          {...profile}
          initialValues={initialValues}
          setEditMode={setEditMode}
          setProfile={setProfile}
        />
      ) : (
        <>
          <UserData
            profile={profile}
            updateUserStatus={updateUserStatus}
            propStatus={status}
            isOwner={isOwner}
          />
          <ContactsComp contacts={profile.contacts} />
          <div className={classNames.edit}>
            {isOwner && <button onClick={() => setEditMode(true)}>Edit</button>}
          </div>
        </>
      )}
    </section>
  )
}

const ContactsComp = ({ contacts }: { contacts: Contacts }) => {
  const contactsList = Object.entries(contacts)
    .map(([item, link]: [string, string | null]) => {
      return (
        link && (
          <li key={item}>
            {item}: <a href={link}>{link}</a>
          </li>
        )
      )
    })
    .filter(item => item)

  if (contactsList.length === 0) contactsList.push(<li key={0}>No contacts</li>)

  return (
    <article>
      <div>Contacts:</div>
      <ul className={classNames.linkList}>{contactsList}</ul>
    </article>
  )
}

type Props = {
  profile: Profile;
  updateUserStatus: (status: string) => void;
  status: string;
  isOwner: boolean;
  setPhoto: (file: File) => void;
  setProfile: (profile: Profile) => void;
};
