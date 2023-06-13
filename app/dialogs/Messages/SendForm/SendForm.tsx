import React, { KeyboardEvent } from 'react';
import classNames from './SendForm.module.css';
import * as yup from 'yup';
import { withFormik, Field, Form as FormikForm, FormikProps } from 'formik';
import { Row } from '@/components/common/Row/Row';

type FormValues = {
  message: string;
}

type OtherProps = {
  sendMessage: (message: string) => void;
}

const InnerForm: React.FC<OtherProps & FormikProps<FormValues>> = ({ errors, touched, submitForm }) => {
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || e.shiftKey) return;
    e.preventDefault();
    submitForm && submitForm();
  };
  
  let hasError = !!(errors.message && touched.message);

  return (
    <FormikForm className={classNames.posts}>
      <Row hasError={hasError} className={classNames.textarea}>
        <Field
          component="textarea"
          name={'message'}
          onKeyDown={onKeyDown}
          placeholder={'Type new message'}
        />
      </Row>
      <button type="submit">Send</button>
    </FormikForm>
  );
};

export const SendForm = withFormik<OtherProps, FormValues>({
  mapPropsToValues() {
    return {
      message: '',
    };
  },
  handleSubmit({ message }, { resetForm, props: { sendMessage } }) {
    sendMessage(message);
    resetForm();
  },
  validationSchema: yup.object().shape({
    message: yup.string().max(500).min(1).required(),
  }),
})(InnerForm);

