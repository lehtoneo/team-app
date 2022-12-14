import React from 'react';
interface DotProps {
  height: number;
  color: string;
}

const Dot: React.FC<DotProps> = (props) => {
  return (
    <span
      style={{
        borderRadius: '50%',
        height: props.height,
        width: props.height,
        display: 'inline-block',
        background: props.color
      }}
    ></span>
  );
};

export default Dot;
