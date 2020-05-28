import React from 'react'
import classNames from './Form.module.css'
import * as yup from 'yup'
import { Form, Field, withFormik } from 'formik'
import { Row } from '../../../Login/Row/Row'

const SendForm = ({ errors, touched }) => {
  return (
    <Form className={classNames.form}>
      <Row error={errors.message} touched={touched.message} className={classNames.textarea}>
        <Field component="textarea" name={'message'} placeholder={'Type new post'} />
      </Row>
      <button type="submit">Send</button>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues() {
    return {
      message: '',
    }
  },
  handleSubmit(values, { resetForm, props: { addPost } }) {
    addPost(values.message)
    resetForm()
  },
  validationSchema: yup.object().shape({
    message: yup.string().max(300).min(10).required(),
  }),
})(SendForm)
