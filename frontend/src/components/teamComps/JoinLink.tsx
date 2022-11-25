import React from 'react';
import { toast } from 'react-toastify';
import Button from '../Button';

interface JoinLinkProps {
  joinLink: string;
  showRegenerateButton?: boolean;
  hideCopyButton?: boolean;
  onRegenerateButtonClick?: () => any;
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
      <div className="flex px-0">
        {!props.hideCopyButton && (
          <div className="flex mr-2">
            <Button onClick={handleClick} color="green">
              Copy
            </Button>
          </div>
        )}
        {props.showRegenerateButton && (
          <div className="flex w-50">
            <Button onClick={props?.onRegenerateButtonClick}>Regenerate</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinLink;
