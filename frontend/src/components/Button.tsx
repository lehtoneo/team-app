import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: 'green' | 'blue' | 'red';
  exactClassName?: string;
  onClick?: (...args: any[]) => any;
  loading?: boolean;
  title: string;
}

const Button = (props: IButtonProps) => {
  const color = props.color ? props.color : 'blue';
  const defaultClassName = `text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center`;
  const className = `${defaultClassName} ${
    props.className ? props.className : ''
  }`;
  const usedClassName = props.exactClassName || className;
  const { exactClassName, color: col, onClick, ...buttonElementProps } = props;

  const handleClick = () => {
    props.onClick && props.onClick();
  };
  return (
    <button
      {...buttonElementProps}
      className={usedClassName}
      onClick={handleClick}
      disabled={props.loading}
    >
      {props.title}
    </button>
  );
};

export default Button;
