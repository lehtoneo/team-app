import React from 'react';

const TableContainer: React.FC = (props) => {
  return (
    <div className="relative rounded-xl overflow-auto">
      <div className="shadow-sm overflow-hidden my-8">{props.children}</div>
    </div>
  );
};

export default TableContainer;
