import React from 'react';

const PageContainer: React.FC = ({ children }) => {
  return <div className="flex-row justify-center">{children}</div>;
};

export default PageContainer;
