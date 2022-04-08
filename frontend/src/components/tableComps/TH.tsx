import React from 'react';

const TH: React.FC = (props) => {
  return (
    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
      {props.children}
    </th>
  );
};

export default TH;
