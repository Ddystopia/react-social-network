import React, { useState } from 'react'
import classNames from './UserInfo.module.css'
import standardAvatar from '../../../assets/images/standardAvatar.jpg'
import UserData from './UserData/UserData'
import Form from './Form/Form'

export default ({ profile, updateUserStatus, status, isOwner, setPhoto, setProfile }) => {
  const [editMode, setEditMode] = useState(false)

  const onChangeFile = (e) => {
    if (e.target.files.length) setPhoto(e.target.files[0])
  }

  const nullToEmptyString = (elem) => {
    if (elem === null) return ''
    else if (typeof elem !== 'object') return elem
    else {
      const newElem = { ...elem }
      for (let subElem of Object.entries(newElem)) {
        newElem[subElem[0]] = nullToEmptyString(subElem[1])
      }
      return newElem
    }
  }
  const initialValues = nullToEmptyString(profile)

  return (
    <section className={classNames.user_info}>
      <article className={classNames.avatar}>
        <img src={profile.photos.small || standardAvatar} alt="Avatar" />
        <div>{isOwner && <input type="file" onChange={onChangeFile} value={''} />}</div>
      </article>
      {editMode ? (
        <Form
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
          <Contacts contacts={profile.contacts} />
          {isOwner && <button onClick={() => setEditMode(true)}>Edit</button>}
        </>
      )}
    </section>
  )
}

const Contacts = ({ contacts }) => {
  const contactsList = Object.keys(contacts)
    .map((item) => {
      const link = contacts[item]
      return (
        link && (
          <li key={link}>
            {item}: <a href={link}>{link}</a>
          </li>
        )
      )
    })
    .filter((item) => item)

  if (contactsList.length === 0) contactsList.push(<li key={0}>Nothing contacts</li>)

  return (
    <article>
      <div>Contacts:</div>
      <ul className={classNames.linkList}>{contactsList}</ul>
    </article>
  )
}
