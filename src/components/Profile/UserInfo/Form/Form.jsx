import React from 'react'
import classNames from './Form.module.css'
import * as yup from 'yup'
import { Form, Field, withFormik } from 'formik'
import { Row } from '../../../Login/Row/Row'
import {
  urlValidator,
  minLengthCreator,
  maxLengthCreator,
  required,
} from '../../../../utils/validators'
import { Input } from '../../../common/FormControls/FormControls'

const minLength2 = minLengthCreator(2)
const maxLength20 = maxLengthCreator(20)
const maxLength100 = maxLengthCreator(100)

const SendForm = ({ contacts, userId, handleSubmit, setProfile, setEditMode }) => {
  const onSubmit = (formData) => {
    setProfile({
      ...formData,
      userId,
    }).then(() => setEditMode(false))
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={classNames.form}>
      <article className={classNames.user_info_text}>
        <h3>
          Name:{' '}
          <Field
            type="text"
            component={Input}
            name={'fullName'}
            validate={[required, minLength2, maxLength20]}
          />
        </h3>
        <div>
          About me:{' '}
          <Field
            type="text"
            component={Input}
            name={'aboutMe'}
            validate={[required, maxLength100]}
          />
        </div>
        <div>
          Looking for a job:
          <div className={classNames.job}>
            <Field component="input" name="lookingForAJob" type="checkbox" />
            <Field
              type="text"
              component={Input}
              name="lookingForAJobDescription"
              validate={[maxLength100]}
            />
          </div>
        </div>
      </article>
      <article>
        <div>Contacts:</div>
        <ul className={classNames.contacts}>
          {Object.keys(contacts).map((el) => (
            <li key={el}>
              {el}:
              <Field
                type="text"
                component={Input}
                name={`contacts.${el}`}
                validate={[urlValidator, maxLength100]}
              />
            </li>
          ))}
        </ul>
      </article>
      <div className={classNames.close} onClick={() => setEditMode(false)}>
        Close
      </div>
      <button type="submit" className={classNames.submit}>Submit</button>
    </Form>
  )
}

export default withFormik({
	handleSubmit(values, {resetForm, props: {userId, setEditMode}})
})(SendForm)
