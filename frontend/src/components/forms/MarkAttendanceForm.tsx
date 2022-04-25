import { Form, Formik } from 'formik';
import Label from './components/Label';
import Switch from 'react-switch';
import Button from '../Button';
import Field from './components/Field';
export interface AttendanceFormValues {
  attendance: boolean;
  reason: string;
}

interface MarkAttendanceFormProps {
  initialValues?: AttendanceFormValues;
  onSubmit: (values: AttendanceFormValues) => Promise<any>;
}
const MarkAttendanceForm: React.FC<MarkAttendanceFormProps> = (props) => {
  const initialValues: AttendanceFormValues = props.initialValues || {
    attendance: true,
    reason: ''
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await props.onSubmit(values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className="my-2">
            <div>{values.attendance ? 'IN' : 'OUT'}</div>
            <Switch
              onChange={(value) => setFieldValue('attendance', value)}
              checked={values.attendance}
            />
            {!values.attendance && (
              <div>
                <Label htmlFor="reason">Reason</Label>
                <Field name="reason" />
              </div>
            )}
            <div className="my-2">
              <Button type="submit" color="green">
                Save
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MarkAttendanceForm;
