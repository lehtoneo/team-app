import Button from '../Button';
import Field from './components/Field';
import Label from './components/Label';
import { Form, Formik } from 'formik';
import FormHeader from './components/FormHeader';
import * as Yup from 'yup';
import FormError from './components/FormError';

const TeamNewsSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string().max(50, 'Too Long!').nullable()
});
interface TeamNewsFormProps {
  onSubmit: (values: TeamNewsFormValues) => Promise<any>;
  type: 'edit' | 'create';
  initialValues?: TeamNewsFormValues;
  disabled?: boolean;
}

export interface TeamNewsFormValues {
  title: string;
  description: string;
}

const TeamNewsForm = (props: TeamNewsFormProps) => {
  const disabled = props.disabled === undefined ? false : props.disabled;
  const headerText = props.type === 'create' ? 'Create News' : 'Edit News';
  const submitText = props.type === 'create' ? 'Create' : 'Edit';
  const initialValues: TeamNewsFormValues = props.initialValues || {
    title: '',
    description: ''
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TeamNewsSchema}
      onSubmit={async (values) => {
        console.log({ values });
        await props.onSubmit({
          ...values
        });
      }}
    >
      {({ errors, touched }) => (
        <Form className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
          <FormHeader>{headerText}</FormHeader>
          <div>
            <Label>Title</Label>
            <FormError touched={touched.title} error={errors.title} />
            <Field
              name="title"
              id="title"
              placeholder="New title"
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

export default TeamNewsForm;
