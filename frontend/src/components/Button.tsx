import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: 'green' | 'blue' | 'red';
  exactClassName?: string;
  onClick?: (...args: any[]) => any;
}

const Button = (props: IButtonProps) => {
  const color = props.color || 'blue';
  const defaultClassName = `w-full text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`;
  const className = `${defaultClassName} ${
    props.className ? props.className : ''
  }`;

  const handleClick = () => {
    props.onClick && props.onClick();
  };
  return (
    <button
      {...props}
      className={props.exactClassName || className}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
