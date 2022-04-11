import { printIntrospectionSchema } from 'graphql';
import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import { Props } from 'react-modal';

type ButtonColor = 'green' | 'blue' | 'red';
type ButtonSize = 'sm' | 'normal';

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: ButtonColor;
  exactClassName?: string;
  onClick?: (...args: any[]) => any;
  loading?: boolean;
  size?: ButtonSize;
  fullW?: boolean;
}

const buttonColorConfig: { [key in ButtonColor]: string } = {
  green: `bg-green-700 hover:bg-green-800 focus:ring-green-400`,
  blue: `bg-blue-700 hover:bg-blue-800 focus:ring-blue-400`,
  red: `bg-red-700 hover:bg-red-800 focus:ring-red-400`
};

const buttonSizeConfig: { [key in ButtonSize]: string } = {
  sm: `rounded-lg text-sm px-2 py-0.5`,
  normal: `font-medium rounded-lg text-sm px-5 py-2.5`
};

const buttonConfigCommon = `text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-center`;

const getClassName = (color: ButtonColor, size: ButtonSize, fullW: boolean) => {
  const fullWStyle = fullW ? 'w-full' : '';
  return `${fullWStyle} ${buttonConfigCommon} ${buttonColorConfig[color]} ${buttonSizeConfig[size]}`;
};

const Button: React.FC<IButtonProps> = (props) => {
  const size = props.size || 'normal';
  const color = props.color ? props.color : 'blue';
  const fullW = props.fullW !== undefined ? props.fullW : true;
  const className = props.exactClassName || getClassName(color, size, fullW);
  const {
    exactClassName,
    color: col,
    onClick,
    children,
    fullW: fullWExtracted,
    ...buttonElementProps
  } = props;

  const usedClassName = props.exactClassName || className;

  const handleClick = () => {
    if (props.disabled) {
      return;
    }
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
