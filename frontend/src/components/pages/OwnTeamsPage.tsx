import React from 'react';
import useCurrentUser from '../../hooks/useCurrentUser';
import useTeamConnection from '../../hooks/useTeamConnection';
import LoadingIndicator from '../LoadingIndicator';
import TeamList from '../TeamList';
import PageContainer from './components/PageContainer';

const NoOwnTeamsInformation: React.FC = () => {
  return <div>You are not a member of any team {`:(`}</div>;
};

const OwnTeamsPage = () => {
  const { currentUser } = useCurrentUser();
  const { teams, loading } = useTeamConnection({
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
      {loading ? <LoadingIndicator /> : <TeamList teams={teams} />}
      {!loading && teams.length === 0 && <NoOwnTeamsInformation />}
    </PageContainer>
  );
};

export default OwnTeamsPage;
