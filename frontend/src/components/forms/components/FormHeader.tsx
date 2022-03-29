import React from 'react';
const FormHeader: React.FC = ({ children }) => {
  return (
    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
      {children}
    </h3>
  );
};

export default FormHeader;
