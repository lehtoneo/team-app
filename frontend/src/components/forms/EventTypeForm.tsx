import Button from '../Button';
import Field from './components/Field';
import Label from './components/Label';
import { Form, Formik } from 'formik';
import FormHeader from './components/FormHeader';
import { HexColorPicker } from 'react-colorful';
import * as Yup from 'yup';
import FormError from './components/FormError';

const EventTypeSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  color: Yup.string().max(50, 'Too Long!').nullable()
});
interface EventTypeFormProps {
  onSubmit: (values: EventTypeFormValues) => Promise<any>;
  onDeleteClick?: () => Promise<any>;
  error?: string;
  initialValues?: EventTypeFormValues;

  disabled?: boolean;
}

export interface EventTypeFormValues {
  id?: number;
  name: string;
  color?: string;
}

const EventTypeForm = (props: EventTypeFormProps) => {
  const type = props.initialValues?.id ? 'edit' : 'create';
  const disabled = props.disabled === undefined ? false : props.disabled;
  const headerText =
    type === 'create' ? 'Create an Event Type' : 'Edit Event Type';
  const submitText = type === 'create' ? 'Create' : 'Edit';
  const initialValues: EventTypeFormValues = props.initialValues
    ? {
        id: props.initialValues.id,
        name: props.initialValues.name,
        color: props.initialValues.color
      }
    : {
        name: ''
      };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EventTypeSchema}
      onSubmit={async (values) => {
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
              placeholder="Event type name"
              required
              disabled={disabled}
            />
          </div>
          <div>
            <Label>Color</Label>
            <FormError touched={touched.color} error={errors.color} />
            <Field name="color" id="color" disabled={true} />
            <HexColorPicker
              color={values.color || 'blue'}
              onChange={(col) => setFieldValue('color', col)}
            />
          </div>

          <div className="flex flex-row">
            {!disabled && (
              <Button
                id="submit"
                type="submit"
                color="green"
                className={type === 'edit' ? 'mr-5' : ''}
              >
                {submitText}
              </Button>
            )}
            {type === 'edit' && (
              <Button
                type="button"
                color="red"
                className="ml-5"
                onClick={props.onDeleteClick}
              >
                Delete
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EventTypeForm;
