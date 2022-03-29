import React from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import useTeamConnection from '../../hooks/useTeamConnection';
import TeamList from '../TeamList';
import PageContainer from './components/PageContainer';

const OwnTeamsPage = () => {
  const { currentUser } = useCurrentUser();
  const { teams } = useTeamConnection({
    teamFilters: {
      ownTeamsOnly: true
    }
  });
  if (!currentUser) {
    throw Error('SHOULD NOT BE HERE');
  }
  return (
    <PageContainer header="My teams">
      <div className="my-2"></div>
      <TeamList teams={teams} />
    </PageContainer>
  );
};

export default OwnTeamsPage;
