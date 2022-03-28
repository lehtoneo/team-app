import { printIntrospectionSchema } from 'graphql';
import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

type ButtonColor = 'green' | 'blue' | 'red';

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: ButtonColor;
  exactClassName?: string;
  onClick?: (...args: any[]) => any;
  loading?: boolean;
}

const buttonColorConfig: { [key in ButtonColor]: string } = {
  green: `bg-green-700 hover:bg-green-800 focus:ring-green-400`,
  blue: `bg-blue-700 hover:bg-blue-800 focus:ring-blue-400`,
  red: `bg-red-700 hover:bg-red-800 focus:ring-red-400`
};

const buttonConfigCommon = `w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`;

const getClassName = (color: ButtonColor) => {
  return `${buttonConfigCommon} ${buttonColorConfig[color]}`;
};

const Button: React.FC<IButtonProps> = (props) => {
  const color = props.color ? props.color : 'blue';
  const className = props.exactClassName || getClassName(color);
  const {
    exactClassName,
    color: col,
    onClick,
    children,
    ...buttonElementProps
  } = props;

  const usedClassName = props.exactClassName || className;

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
      {props.children}
    </button>
  );
};

export default Button;
