import React from 'react';

const Header: React.FC = ({ children }) => {
  return (
    <div className="flex justify-center">
      <h1 className="text-4xl">{children}</h1>
    </div>
  );
};

export default Header;
