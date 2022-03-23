import React from 'react';

const CustomErrorMessage = ({ message }: { message?: string }) => {
  return <>{message && <div className="text-red-500">{message}</div>}</>;
};

export default CustomErrorMessage;
