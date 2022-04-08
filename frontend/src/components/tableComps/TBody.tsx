import React from 'react';

const TBody: React.FC = (props) => {
  return <tbody className="bg-white dark:bg-slate-800">{props.children}</tbody>;
};

export default TBody;
