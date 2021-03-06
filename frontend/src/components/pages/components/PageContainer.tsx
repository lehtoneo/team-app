import React from 'react';
import Header from '../../Header';

interface IPageContainerProps {
  header?: string;
}

const PageContainer: React.FC<IPageContainerProps> = (props) => {
  return (
    <div className="flex-row justify-center">
      {props.header && (
        <div className="mb-5">
          <Header>{props.header}</Header>
        </div>
      )}
      <div className="flex-row md:px-40 lg:px-80 sm:px-10">
        {props.children}
      </div>
    </div>
  );
};

export default PageContainer;
