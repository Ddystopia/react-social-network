import React from 'react'
import classNames from './Login.module.css'
import * as yup from 'yup'
import { Row } from './Row/Row'
import { Form, Field, withFormik } from 'formik'

const LoginForm = ({ values, errors, touched, captchaUrl }) => {
  const hasError = hasInputsError(errors, touched)
  return (
    <Form className={classNames.form}>
      <Row hasError={hasError.email}>
        <Field name={'email'} type={'email'} placeholder={'✉ Email'} autoComplete="on" />
      </Row>
      <Row hasError={hasError.password}>
        <Field name={'password'} type={'password'} placeholder={'🔐︎ Password'} autoComplete="on" />
      </Row>
      <label>
        <Field type={'checkbox'} name={'rememberMe'} checked={values.rememberMe} />
        <p>Remember me</p>
      </label>
      {captchaUrl && (
        <Row hasError={hasError.captcha} className={classNames.captcha}>
          <img src={captchaUrl} alt="captcha" />
          <Field type={'text'} name={'captcha'} placeholder={'Captcha'} />
        </Row>
      )}
      <div>
        <button type="submit">Login</button>
      </div>
    </Form>
  )
}

const hasInputsError = (errors, touched) => {
  const hasError = {}
  for (const input in errors) {
    hasError[input] = touched[input] && errors[input]
  }
  return hasError
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
    email: yup.string().email().max(50).required(),
    password: yup.string().min(8).max(24).required(),
    captcha: yup.string(),
  }),
  handleSubmit(values, { resetForm, props: { loginUser } }) {
    loginUser(values)
    resetForm()
  },
})(LoginForm)

const Login = ({ loginUser, captchaUrl }) => {
  return (
    <section className={classNames.login}>
      <h2>Log in</h2>
      <FormikLoginForm loginUser={loginUser} captchaUrl={captchaUrl} />
    </section>
  )
}
export default Login
