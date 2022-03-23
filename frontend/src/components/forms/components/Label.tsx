import React from 'react';

const Label = (
  props: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
) => {
  return (
    <label
      {...props}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {props.children}
    </label>
  );
};

export default Label;
