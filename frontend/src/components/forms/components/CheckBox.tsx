import React from 'react';

interface ICheckBoxProps {
  value: boolean;
  onValueChange: (value: boolean) => any;
  label?: string;
}

const CheckBox: React.FC<ICheckBoxProps> = (props) => {
  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onValueChange(e.target.checked);
  };
  return (
    <div className="flex items-center mb-4">
      <input
        id="default-checkbox"
        type="checkbox"
        defaultChecked={props.value}
        onChange={handleValueChange}
        value={props.value === true ? 'true' : ''}
        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="default-checkbox"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {props.label}
      </label>
    </div>
  );
};

export default CheckBox;
