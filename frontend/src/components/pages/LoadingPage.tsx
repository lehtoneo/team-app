import React from 'react';
import LoadingIndicator from '../LoadingIndicator';
import PageContainer from './components/PageContainer';

const LoadingPage: React.FC = () => {
  return (
    <PageContainer>
      <LoadingIndicator />
      <div className="text-center">Loading... Please wait</div>
    </PageContainer>
  );
};

export default LoadingPage;
