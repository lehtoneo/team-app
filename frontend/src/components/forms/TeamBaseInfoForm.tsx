import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from '../Button';
import Field from './components/Field';
import Label from './components/Label';
import { Form, Formik } from 'formik';
import CustomErrorMessage from './components/CustomErrorMessage';
import FormHeader from './components/FormHeader';

interface ICreateTeamFormProps {
  onSubmit: (values: ICreateTeamFormValues) => Promise<any>;
  error?: string;
  type?: 'create' | 'edit';
}

interface ICreateTeamFormValues {
  name: string;
  description?: string;
}

const TeamBaseInfoForm = (props: ICreateTeamFormProps) => {
  const type = props.type || 'create';
  const initialValues: ICreateTeamFormValues = {
    name: '',
    description: ''
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await props.onSubmit(values);
      }}
    >
      <Form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
        <FormHeader>Create a new Team</FormHeader>
        <CustomErrorMessage message={props.error} />
        <div>
          <Label>Name</Label>
          <Field name="name" id="name" placeholder="My new Team" required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Field
            type="text-area"
            name="description"
            id="description"
            required={false}
            placeholder="My description"
          />
        </div>
        <Button id="submit" type="submit" color="green">
          Create
        </Button>
      </Form>
    </Formik>
  );
};

export default TeamBaseInfoForm;
