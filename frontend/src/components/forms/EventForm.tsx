import Button from '../Button';
import Field from './components/Field';
import Label from './components/Label';
import { Form, Formik } from 'formik';
import FormHeader from './components/FormHeader';
import DatePickerField from './components/DatepickerField';
import * as Yup from 'yup';
import FormError from './components/FormError';

const EventSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string().max(50, 'Too Long!'),
  start: Yup.date().required(),
  end: Yup.date()
    .min(Yup.ref('start'), "End time can't be before start time")
    .required()
});
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
      validationSchema={EventSchema}
      onSubmit={async (values) => {
        await props.onSubmit({
          ...values
        });
      }}
    >
      {({ errors, touched }) => (
        <Form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
          <FormHeader>{headerText}</FormHeader>
          <div>
            <Label>Name</Label>
            <FormError touched={touched.name} error={errors.name} />
            <Field name="name" id="name" placeholder="Event name" required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <FormError
              touched={touched.description}
              error={errors.description}
            />
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
            <FormError touched={touched.start} error={errors.start} />
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
            <FormError touched={touched.end} error={errors.end} />
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
      )}
    </Formik>
  );
};

export default EventForm;
