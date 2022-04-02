import React from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import useTeam from '../../hooks/useTeam';
import Button from '../Button';
import EventList from '../EventList';
import Header from '../Header';
import PageContainer from './components/PageContainer';

interface ITeamPageContentProps {
  teamId: number;
}

const TeamPageContent = (props: ITeamPageContentProps) => {
  const location = useLocation();

  const { team, loading: loadingTeam } = useTeam({ id: props.teamId });
  const isOwner = team?.currentUserTeamMembership.role === 'OWNER';
  const joinLink = window.location.host + `/teams/join/${team?.joinId}`;
  console.log({ team });
  return (
    <PageContainer header={`Team ${team?.name || ''}`}>
      <div>
        {isOwner && team.joinId && (
          <div className="flex my-3">
            <Button onClick={() => navigator.clipboard.writeText(joinLink)}>
              Copy join link
            </Button>
          </div>
        )}
        <div className="text-lg font-bold">Events</div>
        {isOwner && (
          <div className="flex">
            <Link to="create-event">
              <Button>Create events</Button>
            </Link>
          </div>
        )}
        <EventList events={team?.events || []} />
        <div className="text-lg font-bold">Members</div>
        {team?.memberships.map((teamMembership) => {
          return (
            <div key={teamMembership.id}>{teamMembership.user.firstname}</div>
          );
        })}
      </div>
    </PageContainer>
  );
};

const TeamPage = () => {
  const { teamId } = useParams();
  if (!teamId || isNaN(Number(teamId))) {
    return <Navigate to="/" />;
  }
  return <TeamPageContent teamId={Number(teamId)} />;
};

export default TeamPage;
