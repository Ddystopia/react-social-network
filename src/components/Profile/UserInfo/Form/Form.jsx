import React from 'react'
import PropTypes from 'prop-types'
import classNames from './Form.module.css'
import * as yup from 'yup'
import { Form as FormikForm, Field, withFormik } from 'formik'

const SendForm = ({ errors, touched, contacts, values, setEditMode }) => {
  return (
    <FormikForm className={classNames.form}>
      <article className={classNames.user_info_text}>
        <div>
          <h3>Name: </h3>
          <Field name={'fullName'} />
        </div>
        <div>
          About me: <Field name={'aboutMe'} />
        </div>
        <div className={classNames.job}>
          Looking for a job:
          <label>
            <Field name="lookingForAJob" type="checkbox" checked={values.lookingForAJob} />
            <Field name="lookingForAJobDescription" />
          </label>
        </div>
      </article>
      <article>
        <h3>Contacts:</h3>
        <ul className={classNames.contacts}>
          {Object.keys(contacts).map(el => {
            const hasError =
              errors.contacts && touched.contacts && errors.contacts[el] && touched.contacts[el]
            return (
              <li key={el}>
                <div>{el}:</div>
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
      <article className={classNames.buttons}>
        <button className={classNames.close} type="button" onClick={() => setEditMode(false)}>
          Close
        </button>
        <button type="submit">Submit</button>
      </article>
    </FormikForm>
  )
}

export const Form = withFormik({
  mapPropsToValues({ initialValues }) {
    return { ...initialValues }
  },
  handleSubmit(values, { props: { userId, setProfile } }) {
    setProfile({
      ...values,
      userId,
    })
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

SendForm.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  contacts: PropTypes.object,
  values: PropTypes.object,
  setEditMode: PropTypes.func,
}
