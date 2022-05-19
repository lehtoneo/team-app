import { Form, Formik } from 'formik';
import ReactSwitch from 'react-switch';
import Button from '../Button';
import Field from './components/Field';
import FieldInfo from './components/FieldInfo';
import Label from './components/Label';

export interface TeamSettingsFormValues {
  discordWebhookUrl: string | null;
  discordNotificationsOn: boolean;
  trollMessages: boolean;
}

interface TeamSettingsFormProps {
  initialValues: TeamSettingsFormValues;
  onSubmit: (values: TeamSettingsFormValues) => Promise<any>;
  disabled?: boolean;
}

const TeamSettingsForm: React.FC<TeamSettingsFormProps> = (props) => {
  const initialValues = props.initialValues;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        if (props.disabled) {
          return;
        }
        await props.onSubmit(values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <fieldset disabled={props.disabled}>
            <Label htmlFor="discordWebhookUrl">Discord webhook url</Label>
            <Field
              name="discordWebhookUrl"
              value={values.discordWebhookUrl || ''}
            />
            <div className="my-2"></div>
            <Label htmlFor="discordNotificationsOn">
              Discord notifications on
            </Label>

            <FieldInfo>
              If this setting is on, notifications about events are sent to the
              discord webhook. The notifications include members' attendance
              status changes and new events.
            </FieldInfo>

            <ReactSwitch
              name="discordNotificationsOn"
              disabled={props.disabled}
              checked={values.discordNotificationsOn}
              onChange={(v) => setFieldValue('discordNotificationsOn', v)}
            />

            <div className="my-2"></div>
            <Label htmlFor="trollMessages">Troll messages</Label>
            <FieldInfo>
              If this setting is on, "Troll" messages, such as made up reasons,
              are sent to discord if user marks their status to event as out.
            </FieldInfo>
            <ReactSwitch
              name="trollMessages"
              disabled={props.disabled}
              checked={values.trollMessages}
              onChange={(v) => setFieldValue('trollMessages', v)}
            />

            {!props.disabled && <Button type="submit">Save</Button>}
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default TeamSettingsForm;
