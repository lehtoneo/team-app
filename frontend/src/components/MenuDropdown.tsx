import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useOutsideClickListener from '../hooks/useOutsideClicked';

interface MenuOption {
  to: string;
  label: string;
}

interface MenuDropdownProps {
  openValue?: boolean;
  onOpenValueChange?: (newVal: boolean) => any;
  toggleClassName?: string;
  menuOptions: MenuOption[];
  togglerLabel?: string;
}

const MenuDropdown: React.FC<MenuDropdownProps> = (props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [internalOpenState, setInternalOpenState] = useState<boolean>(
    props.openValue !== undefined ? props.openValue : false
  );
  const usedOpenState =
    props.openValue !== undefined ? props.openValue : internalOpenState;

  useEffect(() => {
    props.onOpenValueChange && props.onOpenValueChange(internalOpenState);
  }, [internalOpenState]);

  useEffect(() => {
    setInternalOpenState(false);
  }, [location]);
  const handleToggleClick = () => {
    setInternalOpenState((curr) => !curr);
  };

  useOutsideClickListener(menuRef, () => setInternalOpenState(false));
  const hidden = usedOpenState ? '' : 'hidden';
  const toggleClassName =
    props.toggleClassName ||
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';
  return (
    <div ref={menuRef}>
      <button
        id="customDropdownButton"
        data-dropdown-toggle="customDropdown"
        className={toggleClassName}
        type="button"
        onClick={handleToggleClick}
      >
        {`${props.togglerLabel || 'Menu'} `}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          transform={`rotate(${usedOpenState ? '180' : '0'} 0 0)`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        id="customDropdown"
        className={`${hidden} z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute`}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="customDropdownButton"
        >
          {props.menuOptions.map((option, index) => {
            return (
              <li key={index}>
                <Link
                  to={option.to}
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {option.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MenuDropdown;
