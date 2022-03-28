import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Formik, Form } from 'formik';

import Button from '../Button';
import Label from './components/Label';
import Field from './components/Field';
import CustomErrorMessage from './components/CustomErrorMessage';

interface SignUpFormValues {
  email: string;
  firstname: string;
  password: string;
}

interface ISignUpFormProps {
  onSignInClick?: (...args: any[]) => void;
  onSubmit: (values: SignUpFormValues) => any;
}

const SignUpForm = ({ onSignInClick, onSubmit }: ISignUpFormProps) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const initialValues: SignUpFormValues = {
    email: '',
    firstname: '',
    password: ''
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            await onSubmit(values);
          } catch (e: any) {
            if (e.message && typeof e.message === 'string') {
              const message: string = e.message;
              if (message.startsWith('duplicate key')) {
                setError('Email is taken');
              } else {
                setError('Something went wrong');
              }
            }
          }
        }}
      >
        <Form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign up to Workout planner
          </h3>
          <CustomErrorMessage message={error} />
          <div>
            <Label htmlFor="email">Your email</Label>
            <Field
              type="email"
              name="email"
              placeholder="youremail@company.com"
            />
          </div>
          <div>
            <Label htmlFor="firstname">Firstname</Label>
            <Field
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Matti"
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
          <Button type="submit" color="green">
            Sign Up
          </Button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered?{' '}
            <Button
              exactClassName="text-blue-700 hover:underline dark:text-blue-500"
              onClick={onSignInClick}
            >
              Sign In
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default SignUpForm;
