import React from 'react';

interface InfoItemProps {
  header: string;
  text?: string;
}

const InfoItem: React.FC<InfoItemProps> = (props) => {
  return (
    <>
      <div className="text-lg font-bold">{props.header}</div>
      <div>{props.children}</div>
      {props.text && <div>{props.text}</div>}
    </>
  );
};

export default InfoItem;
