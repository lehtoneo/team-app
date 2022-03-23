import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from '../Button';
import Field from './components/Field';
import Label from './components/Label';
import { Form, Formik, ErrorMessage } from 'formik';
import { SignInInput } from '../../graphql/mutations/signIn';
import { string } from 'yup';
import { printIntrospectionSchema } from 'graphql';
import CustomErrorMessage from './components/CustomErrorMessage';

interface ISignInFormProps {
  onCreateAccountClick?: (...args: any[]) => void;
  onSubmit: (values: SignInInput) => any;
  error?: string;
}

const SignInForm = ({
  onCreateAccountClick: onSignInClick,
  onSubmit
}: ISignInFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(undefined);
  const initialValues = {
    email: '',
    password: ''
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          setError(undefined);
          setSubmitting(true);
          await onSubmit(values);
        } catch (e: any) {
          setError(e.message);
        }
      }}
    >
      <Form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to Workout planner
        </h3>
        <CustomErrorMessage message={error}/>
        <div>
          <Label>Your email</Label>
          <Field
            type="email"
            name="email"
            id="email"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Your password</Label>
          <Field
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            required
          />
        </div>
        <Button id="submit" type="submit" title="Sign In" />
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{' '}
          <Button
            exactClassName="text-blue-700 hover:underline dark:text-blue-500"
            onClick={onSignInClick}
            title="Create account"
          />
        </div>
      </Form>
    </Formik>
  );
};

export default SignInForm;
