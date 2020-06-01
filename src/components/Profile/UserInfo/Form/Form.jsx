import React from 'react'
import classNames from './Form.module.css'
import * as yup from 'yup'
import { Form, Field, withFormik } from 'formik'

const SendForm = ({ errors, touched, contacts, values, setEditMode }) => {
  return (
    <Form className={classNames.form}>
      <article className={classNames.user_info_text}>
        <h3>
          Name: <Field name={'fullName'} />
        </h3>
        <div>
          About me: <Field name={'aboutMe'} />
        </div>
        <div>
          Looking for a job:
          <label className={classNames.job}>
            <Field name="lookingForAJob" type="checkbox" checked={values.lookingForAJob} />
            <Field name="lookingForAJobDescription" />
          </label>
        </div>
      </article>
      <article>
        <div>Contacts:</div>
        <ul className={classNames.contacts}>
          {Object.keys(contacts).map((el) => {
            const hasError =
              errors.contacts && touched.contacts && errors.contacts[el] && touched.contacts[el]
            return (
              <li key={el}>
                {el}:
                <Field
                  value={values.contacts[el] || ''}
                  name={`contacts.${el}`}
                  style={{
                    outline: hasError ? '2px solid tomato' : '',
                  }}
                />
              </li>
            )
          })}
        </ul>
      </article>
      <button className={classNames.close} type="button" onClick={() => setEditMode(false)}>
        Close
      </button>
      <button type="submit">
        Submit
      </button>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues({ initialValues }) {
    return { ...initialValues }
  },
  handleSubmit(values, { resetForm, props: { userId, setEditMode, setProfile } }) {
    setProfile({
      ...values,
      userId,
    }).then(() => setEditMode(false))
    resetForm()
  },
  validationSchema: yup.object().shape({
    fullName: yup.string().min(2).max(20).required(),
    aboutMe: yup.string().max(100).required(),
    lookingForAJobDescription: yup.string().max(100),
    contacts: yup.object().shape({
      facebook: yup.string().url(),
      website: yup.string().url(),
      vk: yup.string().url(),
      twitter: yup.string().url(),
      instagram: yup.string().url(),
      youtube: yup.string().url(),
      github: yup.string().url(),
      mainLink: yup.string().url(),
    }),
  }),
})(SendForm)
