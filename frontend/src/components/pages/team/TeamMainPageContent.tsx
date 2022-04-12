import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import useTeam from '../../../hooks/useTeam';
import Button from '../../Button';
import InfoItem from '../../InfoItem';
import JoinLink from '../../JoinLink';
import MemberList from '../../MemberList';
import LoadingPage from '../LoadingPage';

interface TeamMainPageContentProps {
  teamId: number;
}

const TeamMainPageContent: React.FC<TeamMainPageContentProps> = (
  props: TeamMainPageContentProps
) => {
  const { team, teamAuth } = useTeam({ id: props.teamId });
  if (team === null) {
    return <Navigate to="/not-found" />;
  }
  if (team === undefined) {
    return <LoadingPage />;
  }

  const url = new URL(window.location.href);
  // eslint-disable-next-line no-useless-concat
  const joinLink = url.origin + '/#' + `/teams/join/${team.joinId}`;

  return (
    <div>
      {team.description && (
        <InfoItem header="Description">{team.description}</InfoItem>
      )}
      {teamAuth.baseInfo.writeRights && (
        <div>
          <Link to="edit">
            <Button size="sm" fullW={false}>
              Edit base info
            </Button>
          </Link>
        </div>
      )}
      <InfoItem header="Members">
        <MemberList users={team.memberships} />
      </InfoItem>
      {teamAuth.joinLink.readRights && team.joinId && (
        <InfoItem header="Join link">
          <JoinLink joinLink={joinLink} />
        </InfoItem>
      )}
    </div>
  );
};

export default TeamMainPageContent;
