import React from 'react';
import { Field as FormikField, FieldAttributes } from 'formik';

type FieldSize = 'sm' | 'normal';

interface FieldProps extends FieldAttributes<any> {
  size?: FieldSize;
}
const fieldSizeConfig: { [key in FieldSize]: string } = {
  sm: 'text-xs rounded-md p-1',
  normal: 'text-sm rounded-lg p-2.5'
};

const commonStyle =
  'block w-full bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white';

export const fieldClassName = `${commonStyle} ${fieldSizeConfig['normal']}`;

const Field: React.FC<FieldProps> = (props) => {
  const size = props.size || 'normal';
  const className = `${commonStyle} ${fieldSizeConfig[size]}`;
  return <FormikField {...props} className={className} />;
};

export default Field;
