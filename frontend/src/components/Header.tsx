import React from 'react';

interface IHeaderProps {
  size?: 4 | 3 | 2;
}

const classNameConfig = {
  4: 'text-4xl',
  3: 'text-3xl',
  2: 'text-2xl'
};

const Header: React.FC<IHeaderProps> = (props) => {
  const size = props.size || 4;
  return (
    <div className="flex justify-center">
      <h1 className={classNameConfig[size]}>{props.children}</h1>
    </div>
  );
};

export default Header;
