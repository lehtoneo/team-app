import React from 'react';

const TD: React.FC = (props) => {
  return (
    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {props.children}
    </td>
  );
};

export default TD;
