import React from 'react';
import { Navigate } from 'react-router-dom';
import { TeamQuerySuccessData } from '../../../graphql/queries/team';
import useCurrentUser from '../../../hooks/useCurrentUser';
import useTeam from '../../../hooks/useTeam';
import teamAuthUtils from '../../../utils/teamAuth';
import Button from '../../Button';
import Header from '../../Header';
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
  const { team } = useTeam({ id: props.teamId });
  const { currentUser } = useCurrentUser();
  if (team === null) {
    return <Navigate to="/not-found" />;
  }
  if (team === undefined) {
    return <LoadingPage />;
  }

  const hasJoinLinkRights = teamAuthUtils.isUserTeamRoleAtleast(
    team.currentUserTeamMembership.role,
    'ADMIN'
  );
  const url = new URL(window.location.href);
  // eslint-disable-next-line no-useless-concat
  const joinLink = url.origin + '/#' + `/teams/join/${team.joinId}`;

  return (
    <div>
      <InfoItem header="Description">{team.description}</InfoItem>

      <InfoItem header="Members">
        <MemberList users={team.memberships} />
      </InfoItem>
      {hasJoinLinkRights && team.joinId && (
        <InfoItem header="Join link">
          <JoinLink joinLink={joinLink} />
        </InfoItem>
      )}
    </div>
  );
};

export default TeamMainPageContent;
