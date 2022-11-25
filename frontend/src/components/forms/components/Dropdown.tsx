interface Option {
  label: string;
  value: string;
}

interface IDropdownProps {
  options: Option[];
  value: string | undefined;
  onChange: (val: string) => any;
}
const OptionItem: React.FC<{ option: Option }> = ({
  option
}: {
  option: Option;
}) => {
  return (
    <li>
      <a
        href="#"
        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        {option.value}
      </a>
    </li>
  );
};
const Dropdown: React.FC<IDropdownProps> = (props) => {
  return (
    <>
      <div className="relative w-full lg:max-w-sm">
        <select
          className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
          onChange={(e) => props.onChange(e.target.value)}
          value={props.value}
        >
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
