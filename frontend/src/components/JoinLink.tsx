import React from 'react';
import { toast } from 'react-toastify';
import Button from './Button';

interface JoinLinkProps {
  joinLink: string;
}

const JoinLink: React.FC<JoinLinkProps> = (props) => {
  const handleClick = () => {
    navigator.clipboard.writeText(props.joinLink);
    toast('Join Link copied to clipboard', { type: 'success' });
  };
  return (
    <div className="flex-row my-3">
      <div className="text-sm border-2 border-gray-500 bg-gray-400 p-2 mb-2 rounded">
        {props.joinLink}
      </div>
      <div className="flex px-20">
        <Button onClick={handleClick}>Copy</Button>
      </div>
    </div>
  );
};

export default JoinLink;
