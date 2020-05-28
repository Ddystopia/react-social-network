import React from 'react'
import classNames from './Login.module.css'
import * as yup from 'yup'
import Row from './Row/Row'
import { Form, Field, withFormik } from 'formik'

const LoginForm = ({ values, errors, touched, captchaUrl }) => {
  return (
    <Form>
      <Row touched={touched.email} error={errors.email}>
        <Field name={'email'} type={'email'} placeholder={'Type email'} />
      </Row>
      <Row touched={touched.password} error={errors.password}>
        <Field name={'password'} type={'password'} placeholder={'Type password'} />
      </Row>
      <label>
        <p>Remember me</p>
        <Field type={'checkbox'} name={'rememberMe'} checked={values.rememberMe} />
      </label>
      {captchaUrl && (
        <div className={classNames.captcha}>
          <img src={captchaUrl} alt="captcha" />
          <Row touched={touched.captchaUrl} error={errors.captchaUrl}>
            <Field type={'text'} name={'captcha'} placeholder={'Type captcha'} />
          </Row>
        </div>
      )}
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  )
}

const FormikLoginForm = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      captcha: '',
    }
  },
  validationSchema: yup.object().shape({
    email: yup.string().email('Invalid email').max(50, 'Max length is 50').required(),
    password: yup.string().min(8, 'Min length is 8').max(24, 'Max length is 24').required(),
  }),
  handleSubmit(values, { resetForm, props: { loginUser } }) {
    loginUser(values)
    resetForm()
  },
})(LoginForm)

export default ({ loginUser, captchaUrl }) => {
  return (
    <section>
      <h2>Login</h2>
      <FormikLoginForm loginUser={loginUser} captchaUrl={captchaUrl} />
    </section>
  )
}
