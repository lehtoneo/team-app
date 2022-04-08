import React from 'react';

const FormError = ({
  error,
  touched
}: {
  error?: string;
  touched?: boolean;
}) => {
  return <>{touched && <div className="text-red-500">{error}</div>}</>;
};

export default FormError;
