import React, { useEffect } from 'react';
import { Formik, useField, useFormikContext, FieldHookConfig } from 'formik';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fieldClassName } from './Field';

type CustomDatePickerProps = Omit<ReactDatePickerProps, 'onChange'>;

interface IProps {
  fieldProps: FieldHookConfig<string>;
  datePickerProps?: CustomDatePickerProps;
  initialTime?: Date;
}

const DatePickerField = ({ ...props }: IProps) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.fieldProps);

  const handleChange = (val: Date | null) => {
    if (val) {
      setFieldValue(field.name, val);
    } else {
      setFieldValue(field.name, null);
    }
  };

  useEffect(() => {
    if (props.initialTime) {
      handleChange(props.initialTime);
    } else {
      handleChange(new Date());
    }
  }, []);
  return (
    <DatePicker
      {...field}
      {...props.datePickerProps}
      className={fieldClassName}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        handleChange(val);
      }}
      dateFormat="dd.MM.yyyy HH:mm:ss"
    />
  );
};

export default DatePickerField;
