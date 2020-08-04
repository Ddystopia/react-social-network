import React from 'react'
import PropTypes from 'prop-types'
import classNames from './SendForm.module.css'
import * as yup from 'yup'
import { withFormik, Field, Form as FormikForm } from 'formik'
import { Row } from '../../../Login/Row/Row'

export const SendForm = ({ errors, touched, submitForm }) => {
  const onKeyDown = e => {
    if (e.key !== 'Enter' || e.shiftKey) return
    e.preventDefault()
    submitForm()
  }
  return (
    <FormikForm className={classNames.posts}>
      <Row hasError={errors.message && touched.message} className={classNames.textarea}>
        <Field
          component="textarea"
          name={'message'}
          onKeyDown={onKeyDown}
          placeholder={'Type new message'}
        />
      </Row>
      <button type="submit">Send</button>
    </FormikForm>
  )
}

export const Form = withFormik({
  mapPropsToValues() {
    return {
      message: '',
    }
  },
  handleSubmit({ message }, { resetForm, props: { sendMessage } }) {
    sendMessage(message)
    resetForm()
  },
  validationSchema: yup.object().shape({
    message: yup.string().max(500).min(1).required(),
  }),
})(SendForm)

SendForm.propTypes = {
  errors: PropTypes.object,
  touched: PropTypes.object,
  submitForm: PropTypes.func,
}
