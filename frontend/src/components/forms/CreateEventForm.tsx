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
import FormHeader from './components/FormHeader';
import DatePickerField from './components/DatepickerField';

interface ICreateTeamFormProps {
  onSubmit: (values: ICreateTeamEventFormValues) => Promise<any>;
  error?: string;
}

export interface ICreateTeamEventFormValues {
  name: string;
  description?: string;
  start: Date;
  end: Date;
}

const CreateEventForm = ({ onSubmit, error }: ICreateTeamFormProps) => {
  const initialValues: ICreateTeamEventFormValues = {
    name: '',
    description: '',
    start: new Date(),
    end: new Date()
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
    >
      <Form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
        <FormHeader>Create an Event</FormHeader>
        <CustomErrorMessage message={error} />
        <div>
          <Label>Name</Label>
          <Field name="name" id="name" placeholder="Event name" required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Field
            type="text-area"
            name="description"
            id="description"
            required={false}
            placeholder=""
          />
        </div>
        <div>
          <Label htmlFor="start">Start time</Label>
          <DatePickerField
            fieldProps={{
              name: 'start'
            }}
            datePickerProps={{
              showTimeSelect: true
            }}
          />
        </div>
        <div>
          <Label htmlFor="end">End time</Label>
          <DatePickerField
            fieldProps={{
              name: 'end'
            }}
            datePickerProps={{
              showTimeSelect: true
            }}
          />
        </div>
        <Button id="submit" type="submit" color="green">
          Create
        </Button>
      </Form>
    </Formik>
  );
};

export default CreateEventForm;
