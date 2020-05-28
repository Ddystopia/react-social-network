import React from 'react'
import classNames from './SendForm.module.css'
import * as yup from 'yup'
import { withFormik, Field, Form } from 'formik'
import { Row } from '../../../Login/Row/Row'

const SendForm = ({ errors, touched }) => {
  return (
    <Form className={classNames.posts}>
      <Row error={errors.message} touched={touched.message} className={classNames.textarea}>
        <Field component="textarea" name={'message'} placeholder={'Type new message'} />
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
  handleSubmit(values, { resetForm, props: { sendMessage } }) {
    sendMessage(values.message)
    resetForm()
  },
  validationSchema: yup.object().shape({
    message: yup.string().max(500).min(1).required(),
  }),
})(SendForm)
