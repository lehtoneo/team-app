import Button from '../Button';
import Field from './components/Field';
import Label from './components/Label';
import { Form, Formik } from 'formik';
import CustomErrorMessage from './components/CustomErrorMessage';
import FormHeader from './components/FormHeader';
import DatePickerField from './components/DatepickerField';

interface EventFormProps {
  onSubmit: (values: EventFormValues) => Promise<any>;
  error?: string;
  type: 'edit' | 'create';
  initialValues?: EventFormValues;
}

export interface EventFormValues {
  name: string;
  description?: string;
  start: string;
  end: string;
}

const EventForm = (props: EventFormProps) => {
  const headerText = props.type === 'create' ? 'Create an Event' : 'Edit event';
  const submitText = props.type === 'create' ? 'Create' : 'Edit';
  console.log(props.initialValues);
  const initialValues: EventFormValues = props.initialValues || {
    name: '',
    description: '',
    start: new Date().toISOString(),
    end: new Date().toISOString()
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await props.onSubmit({
          ...values
        });
      }}
    >
      <Form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
        <FormHeader>{headerText}</FormHeader>
        <CustomErrorMessage message={props.error} />
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
          {submitText}
        </Button>
      </Form>
    </Formik>
  );
};

export default EventForm;
