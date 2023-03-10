interface IOption {
  value: string;
  label: string;
}

interface IRadioGroupProps {
  value: string;
  onValueChange: (val: string) => void;

  options: IOption[];
}

const RadioGroup: React.FC<IRadioGroupProps> = (props) => {
  return (
    <>
      {props.options.map((o, index) => {
        const id = `radio-${index}`;
        return (
          <div className="flex items-center mb-4" key={index}>
            <input
              checked={props.value === o.value}
              onChange={(v) => {
                props.onValueChange(o.value);
              }}
              value={o.value}
              id={id}
              type="radio"
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={id}
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {o.label}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default RadioGroup;
