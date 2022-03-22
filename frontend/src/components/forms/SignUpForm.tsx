import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';

import Button from '../Button';
import Input from '../Input';
import Label from '../Label';

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
  const initialValues: SignUpFormValues = {
    email: '',
    firstname: '',
    password: ''
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign up to Workout planner
          </h3>
          <div>
            <Label htmlFor="email">Your email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="firstname">Firstname</Label>
            <Input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Matti"
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
          <Button id="submit" type="submit" color="green">
            Sign up
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
