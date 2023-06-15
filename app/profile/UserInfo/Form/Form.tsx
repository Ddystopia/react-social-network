'use client';

import React, { FC } from 'react';
import classNames from './Form.module.css';
import * as yup from 'yup';
import { FormikProps, withFormik, Form, Field } from 'formik';
import { Profile } from '@/redux/profileReducer';

type FormValues = Profile;

type OtherProps = {
  initialValues: FormValues;
  userId: number;
  setProfile: (values: FormValues) => void;
  setEditMode: (editMode: boolean) => void;
};

const InnerForm: FC<FormikProps<FormValues> & OtherProps> = ({
  errors,
  touched,
  values,
  setEditMode,
}) => {
  return (
    <Form className={classNames.form}>
      <article className={classNames.user_info_text}>
        <div>
          <h3>Name: </h3>
          <Field name={'fullName'} />
        </div>
        <div>
          About me: <Field name={'aboutMe'} />
        </div>
        <div className={classNames.job}>
          Looking for a job:
          <label>
            <Field name="lookingForAJob" type="checkbox" checked={values.lookingForAJob} />
            <Field name="lookingForAJobDescription" />
          </label>
        </div>
      </article>
      <article>
        <h3>Contacts:</h3>
        <ul className={classNames.contacts}>
          {(Object.keys(values.contacts) as Array<keyof FormValues['contacts']>).map((el) => {
            const hasError = errors.contacts?.[el] && touched.contacts?.[el];
            return (
              <li key={el} className={classNames.contact_link}>
                <div>{el}:</div>
                <Field
                  value={values.contacts[el] || ''}
                  name={`contacts.${el}`}
                  style={{
                    outline: hasError ? '2px solid tomato' : '',
                  }}
                />
              </li>
            );
          })}
        </ul>
      </article>
      <article className={classNames.buttons}>
        <button className={classNames.close} type="button" onClick={() => setEditMode(false)}>
          Close
        </button>
        <button type="submit">Submit</button>
      </article>
    </Form>
  );
};

export const SendForm = withFormik<OtherProps, FormValues>({
  mapPropsToValues: ({ initialValues }) => {
    return { ...initialValues };
  },

  validationSchema: yup.object().shape({
    fullName: yup.string().min(2).max(20).required(),
    aboutMe: yup.string().max(100).required(),
    lookingForAJobDescription: yup.string().max(100),
    contacts: yup.object().shape({
      facebook: yup.string().url(),
      website: yup.string().url(),
      vk: yup.string().url(),
      twitter: yup.string().url(),
      instagram: yup.string().url(),
      youtube: yup.string().url(),
      github: yup.string().url(),
      mainLink: yup.string().url(),
    }),
  }),

  handleSubmit: (values, { props: { setProfile } }) => {
    setProfile(values);
  },
})(InnerForm);
