import React from 'react'
import classNames from './Form.module.css'
import * as yup from 'yup'
import { Form as FormikForm, Field, withFormik } from 'formik'
import { Row } from '../../../Login/Row/Row'

const SendForm = ({ errors, touched }) => {
  return (
    <FormikForm className={classNames.form}>
      <Row hasError={touched.post && errors.post} className={classNames.textarea}>
        <Field component="textarea" name={'post'} placeholder={'Type new post'} />
      </Row>
      <button type="submit">Send</button>
    </FormikForm>
  )
}

export const Form = withFormik({
  mapPropsToValues() {
    return {
      post: '',
    }
  },
  handleSubmit(values, { resetForm, props: { addPost } }) {
    addPost(values.post)
    resetForm()
  },
  validationSchema: yup.object().shape({
    post: yup.string().max(300).min(10).required(),
  }),
})(SendForm)
