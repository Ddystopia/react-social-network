"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup'
import { Form, Field, withFormik, FormikProps, FormikErrors, FormikTouched } from 'formik'

import { Row } from '@/components/common/Row/Row'
import { Preloader } from '@/components/common/Preloader/Preloader'

import { login } from '@/redux/authReducer'
import { getCaptchaUrl, getIsAuth, getIsFetchingAuth } from '@/redux/selectors/selectors'

import { LoginValues } from '@/api/api'

import classNames from './Login.module.css'

type LoginFormProps = {
  values: LoginValues
  errors: FormikErrors<LoginValues>
  touched: FormikTouched<LoginValues>
  captchaUrl: string | null
}

const LoginForm: React.FC<LoginFormProps & FormikProps<LoginValues>> = ({
  values,
  errors,
  touched,
  captchaUrl
}) => {
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

const hasInputsError = (errors: FormikErrors<LoginValues>, touched: FormikTouched<LoginValues>) => {
  const hasError: { [key: string]: boolean } = {}

  for (const input in errors) {
    let key: keyof LoginValues = input as keyof LoginValues;

    hasError[input] = Boolean(touched[key] && errors[key])
  }

  return hasError
}

type FormikLoginFormProps = {
  loginUser: (values: LoginValues) => void
  captchaUrl?: string
}

const FormikLoginForm = withFormik<FormikLoginFormProps, LoginValues>({
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
    password: yup.string().min(8).max(64).required(),
    captcha: yup.string(),
  }),
  handleSubmit(values, { resetForm, props: { loginUser } }) {
    loginUser(values)
    resetForm()
  },
})(LoginForm)

type LoginProps = {
  loginUser: (values: LoginValues) => void
  captchaUrl?: string
}

const Login: React.FC<LoginProps> = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(getIsAuth);
  const isFetching = useSelector(getIsFetchingAuth);
  const captchaUrl = useSelector(getCaptchaUrl) || undefined;
  const router = useRouter()

  useEffect(() => {
    if (isAuth) {
      router.push('/profile')
    }
  }, [isAuth])

  const loginUser = (formData: LoginValues) => {
    dispatch(login(formData))
  }

  if (isFetching) {
    return <Preloader />
  }
  return (
    <section className={classNames.login}>
      <h2>Log in</h2>
      <FormikLoginForm
        loginUser={loginUser}
        captchaUrl={captchaUrl}
      />
    </section>
  )
}

export default Login
