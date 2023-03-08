import Button from '../Button';
import Field from './components/Field';
import Label from './components/Label';
import { Form, Formik } from 'formik';
import FormHeader from './components/FormHeader';
import DatePickerField from './components/DatepickerField';
import * as Yup from 'yup';
import FormError from './components/FormError';
import Dropdown from './components/Dropdown';
import { EventTypeListInfo } from '../../graphql/queries/eventTypeConnection';

const EventSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string().max(50, 'Too Long!').nullable(),
  start: Yup.date().required(),
  end: Yup.date()
    .when('start', (start_time: Date, schema) => {
      if (start_time) {
        const startPlusSecond = new Date(start_time.getTime() + 1000);
        return schema.min(startPlusSecond, 'End time must be after start time');
      } else {
        return schema;
      }
    })
    .required()
});
interface EventFormProps {
  onSubmit: (values: EventFormValues) => Promise<any>;
  error?: string;
  type: 'edit' | 'create';
  initialValues?: EventFormValues;
  eventTypes: EventTypeListInfo[];
  disabled?: boolean;
}

export interface EventFormValues {
  name: string;
  description?: string;
  start: string;
  end: string;
  typeId?: number | null;
}

const EventForm = (props: EventFormProps) => {
  const disabled = props.disabled === undefined ? false : props.disabled;
  const headerText = props.type === 'create' ? 'Create an Event' : 'Edit event';
  const submitText = props.type === 'create' ? 'Create' : 'Edit';
  const initialValues: EventFormValues = props.initialValues || {
    name: '',
    description: '',
    start: new Date().toISOString(),
    end: new Date().toISOString()
  };
  const eventTypeOptions = props.eventTypes.map((et) => {
    return {
      value: et.id.toString(),
      label: et.name
    };
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EventSchema}
      onSubmit={async (values) => {
        console.log({ values });
        await props.onSubmit({
          ...values
        });
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
          <FormHeader>{headerText}</FormHeader>
          <div>
            <Label>Name</Label>
            <FormError touched={touched.name} error={errors.name} />
            <Field
              name="name"
              id="name"
              placeholder="Event name"
              required
              disabled={disabled}
            />
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
              disabled={disabled}
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <FormError touched={touched.typeId} error={errors.typeId} />
            <Dropdown
              options={eventTypeOptions}
              emptyLabel={'-- No type --'}
              value={!values.typeId ? undefined : values.typeId}
              onChange={(val) => {
                setFieldValue('typeId', val ? Number(val) : null);
              }}
            />
          </div>
          <div>
            <Label htmlFor="start">Start time</Label>
            <FormError touched={touched.start} error={errors.start} />
            <DatePickerField
              disabled={disabled}
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
              disabled={disabled}
              fieldProps={{
                name: 'end'
              }}
              datePickerProps={{
                showTimeSelect: true
              }}
            />
          </div>
          {!disabled && (
            <Button id="submit" type="submit" color="green">
              {submitText}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default EventForm;
