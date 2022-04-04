import { Form, Formik } from 'formik';
import ReactSwitch from 'react-switch';
import Button from '../Button';
import Field from './components/Field';
import Label from './components/Label';

export interface TeamSettingsFormValues {
  discordWebhookUrl: string | null;
  discordNotificationsOn: boolean;
}

interface TeamSettingsFormProps {
  initialValues: TeamSettingsFormValues;
  onSubmit: (values: TeamSettingsFormValues) => Promise<any>;
}

const TeamSettingsForm: React.FC<TeamSettingsFormProps> = (props) => {
  const initialValues = props.initialValues;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await props.onSubmit(values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <Label htmlFor="discordWebhookUrl">Discord webhook url</Label>
          <Field
            name="discordWebhookUrl"
            value={values.discordWebhookUrl || ''}
          />

          <Label htmlFor="discordNotificationsOn">
            Discord notifications on
          </Label>
          <ReactSwitch
            name="discordNotificationsOn"
            checked={values.discordNotificationsOn}
            onChange={(v) => setFieldValue('discordNotificationsOn', v)}
          />

          <Button type="submit">Save</Button>
        </Form>
      )}
    </Formik>
  );
};

export default TeamSettingsForm;