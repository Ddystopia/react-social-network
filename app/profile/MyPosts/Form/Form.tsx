"use client"

import React, { FC } from 'react'
import classNames from './Form.module.css'
import * as yup from 'yup'
import { withFormik, FormikProps, Form, Field } from 'formik'
import { Row } from '../../../../components/common/Row/Row'

interface FormValues {
  post: string;
}

interface OtherProps {
  addPost: (post: string) => void;
}

const InnerForm: FC<FormikProps<FormValues> & OtherProps> = ({ touched, errors }) => {
  return (
    <Form className={classNames.form}>
      <Row hasError={touched.post && !!errors.post} className={classNames.textarea}>
        <Field component="textarea" name={'post'} placeholder={'Type new post'} />
      </Row>
      <button type="submit">Send</button>
    </Form>
  )
}

export const SendForm = withFormik<OtherProps, FormValues>({
  mapPropsToValues: () => {
    return {
      post: '',
    }
  },

  validationSchema: yup.object().shape({
    post: yup.string().max(300).min(10).required(),
  }),

  handleSubmit: (values, { resetForm, props: { addPost } }) => {
    addPost(values.post)
    resetForm()
  },
})(InnerForm)

