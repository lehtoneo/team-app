import Button from '../Button';
import Field from './components/Field';
import Label from './components/Label';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FormError from './components/FormError';
import { TeamMemberRole, teamMemberRoles } from '../../graphql/queries/team';

const TeamMembershipSchema = Yup.object().shape({
  name: Yup.string().oneOf([...teamMemberRoles])
});
interface TeamMemberFormProps {
  onSubmit: (values: TeamMemberFormValues) => Promise<any>;
  error?: string;
  initialValues: TeamMemberFormValues;
}

export interface TeamMemberFormValues {
  role: TeamMemberRole;
}

const TeamMembershipForm = (props: TeamMemberFormProps) => {
  const roleOptions = [...teamMemberRoles].filter((role) => role !== 'OWNER');
  const initialValues: TeamMemberFormValues = props.initialValues;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TeamMembershipSchema}
      onSubmit={async (values) => {
        await props.onSubmit({
          ...values
        });
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            {initialValues.role !== 'OWNER' && (
              <>
                <Label>Role</Label>
                <FormError touched={touched.role} error={errors.role} />
                <Field as="select" name="role" size="sm">
                  {roleOptions.map((role) => (
                    <option value={role} key={role}>
                      {role}
                    </option>
                  ))}
                </Field>
              </>
            )}
          </div>
          <div className="flex justify-center my-2">
            <Button
              id="submit"
              type="submit"
              color="green"
              fullW={false}
              size="sm"
            >
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TeamMembershipForm;
