import React from 'react';

type HeaderSize = 4 | 3 | 2 | 1;

interface IHeaderProps {
  size?: HeaderSize;
  center?: boolean;
}

const centerConfig: { [key in 'true' | 'false']: string } = {
  true: 'justify-center',
  false: ''
};

const classNameConfig: { [key in HeaderSize]: string } = {
  4: 'text-4xl',
  3: 'text-3xl',
  2: 'text-2xl',
  1: 'text-1xl'
};

const Header: React.FC<IHeaderProps> = (props) => {
  const size = props.size || 4;
  const center = props.center !== undefined ? props.center : true;
  return (
    <div className={`flex ${centerConfig[`${center}`]}`}>
      <h1 className={classNameConfig[size]}>{props.children}</h1>
    </div>
  );
};

export default Header;
