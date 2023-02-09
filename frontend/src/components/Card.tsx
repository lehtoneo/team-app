import react from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  createdAt: string;
  viewRef?: (node?: Element | null | undefined) => void;
  footerRightComponent?: React.ReactNode;
}
const Card: React.FC<CardProps> = (props) => {
  return (
    <div ref={props.viewRef} className="flex-col my-2">
      <div className="border border-gray-400 bg-white rounded-md p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            {props.title}
          </div>
          <p className="text-gray-700 text-base truncate">
            {props.description}
          </p>
        </div>
        <div className="flex flex-row relative items-center ">
          <div className="flex-col text-sm">
            <p className="text-gray-600">{props.createdAt}</p>
          </div>
          <div className="flex absolute right-0">
            {props.footerRightComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
