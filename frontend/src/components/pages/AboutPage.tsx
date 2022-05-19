import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from './components/PageContainer';

const AboutPage: React.FC = () => {
  return (
    <PageContainer header="About">
      This is a Team app. The purpose of the application is to provide a
      platform for sport teams to manage their events. This is a school project
      for course{' '}
      <a
        className="no-underline hover:underline text-sky-600"
        href="https://fullstackopen.com/"
      >
        Full stack Open
      </a>
      .
    </PageContainer>
  );
};

export default AboutPage;
