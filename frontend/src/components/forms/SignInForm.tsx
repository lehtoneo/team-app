import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from '../Button';
import Input from '../Input';
import Label from '../Label';
import { Form, Formik } from 'formik';

interface ISignInFormProps {
  onCreateAccountClick?: (...args: any[]) => void;
  onSubmit: (email: string, password: string) => any;
}

const SignInForm = ({
  onCreateAccountClick: onSignInClick,
  onSubmit
}: ISignInFormProps) => {
  const initialValues = {
    email: '',
    password: ''
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values.email, values.password)}
    >
      <Form
        className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
        action="#"
        onSubmit={() => console.log('ok')}
      >
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to Workout planner
        </h3>
        <div>
          <Label>Your email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Your password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            required
          />
        </div>
        <Button id="submit" type="submit">
          Sign up
        </Button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{' '}
          <button
            className="text-blue-700 hover:underline dark:text-blue-500"
            onClick={onSignInClick}
          >
            Create account
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default SignInForm;
