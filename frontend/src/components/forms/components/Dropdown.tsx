interface Option {
  label: string;
  value: string;
}

interface IDropdownProps {
  options: Option[];
  value: string | undefined;
  emptyLabel?: string;
  onChange: (val: string | undefined) => any;
}
const Dropdown: React.FC<IDropdownProps> = (props) => {
  return (
    <>
      <div className="relative w-full lg:max-w-sm">
        <select
          className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
          onChange={(e) => {
            if (e.target.value === 'undefined') {
              props.onChange(undefined);
            } else {
              props.onChange(e.target.value);
            }
          }}
          value={props.value}
        >
          {props.emptyLabel && (
            <option value={'undefined'} className="text-gray-500">
              {props.emptyLabel}
            </option>
          )}
          {props.options.map((o) => (
            <option value={o.value} key={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Dropdown;
