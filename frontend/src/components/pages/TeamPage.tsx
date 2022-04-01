import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import useTeam from '../../hooks/useTeam';
import Button from '../Button';
import Header from '../Header';
import PageContainer from './components/PageContainer';

interface ITeamPageContentProps {
  teamId: number;
}

const TeamPageContent = (props: ITeamPageContentProps) => {
  const { team, loading: loadingTeam } = useTeam({ id: props.teamId });

  return (
    <PageContainer header={`Team ${team?.name || ''}`}>
      <div>
        <div>Events</div>
        <div className="flex">
          <Link to="create-event">
            <Button>Create events</Button>
          </Link>
        </div>
        {team?.events.map((event) => {
          return <div key={event.id}>{event.name}</div>;
        })}
        <div>Members</div>
        {team?.members.map((member) => {
          return <div key={member.id}>{member.firstname}</div>;
        })}
      </div>
    </PageContainer>
  );
};

const TeamPage = () => {
  const { id } = useParams();
  if (!id || isNaN(Number(id))) {
    return <Navigate to="/" />;
  }
  return <TeamPageContent teamId={Number(id)} />;
};

export default TeamPage;
