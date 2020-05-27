import React from 'react'
import classNames from './SendForm.module.css'
import { reduxForm, Field } from 'redux-form'
import { Textarea } from '../../../common/FormControls/FormControls'
import { required, maxLengthCreator } from '../../../../utils/validators'

const maxLength300 = maxLengthCreator(300)

const SendForm = ({ handleSubmit, sendMessage, reset }) => {
  return (
    <form
      onSubmit={handleSubmit((formData) => {
        sendMessage(formData.message)
        reset()
      })}
      className={classNames.posts}
    >
      <Field
        className={classNames.textarea}
        component={Textarea}
        name={'message'}
        placeholder={'Type new message'}
        validate={[required, maxLength300]}
      />
      <button>Send</button>
    </form>
  )
}

export default reduxForm({ form: 'sendMessage' })(SendForm)
