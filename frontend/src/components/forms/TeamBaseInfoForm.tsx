import React from 'react';
import Button from '../Button';
import Field from './components/Field';
import Label from './components/Label';
import { Form, Formik } from 'formik';
import CustomErrorMessage from './components/CustomErrorMessage';
import FormHeader from './components/FormHeader';

interface TeamBaseInfoFormProps {
  onSubmit: (values: TeamBaseInfoFormValues) => Promise<any>;
  error?: string;
  type?: 'create' | 'edit';
  initialValues?: TeamBaseInfoFormValues;
}

export interface TeamBaseInfoFormValues {
  name: string;
  description?: string;
}

const TeamBaseInfoForm = (props: TeamBaseInfoFormProps) => {
  const type = props.type || 'create';
  const headerText =
    type === 'edit' ? 'Edit team base info' : 'Create a new Team';
  const submitButtonText = type === 'edit' ? 'Save' : 'Create';
  const initialValues: TeamBaseInfoFormValues = props.initialValues || {
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
        <FormHeader>{headerText}</FormHeader>
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
          {submitButtonText}
        </Button>
      </Form>
    </Formik>
  );
};

export default TeamBaseInfoForm;
