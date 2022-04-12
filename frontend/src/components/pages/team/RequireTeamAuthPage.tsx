import React from 'react';
import { Navigate } from 'react-router-dom';
import { TeamMemberRole, TeamMembership } from '../../../graphql/queries/team';
import teamAuthUtils from '../../../utils/teamAuth';

type RequireTeamAuthProps = {
  currentUserTeamMembership: Pick<TeamMembership, 'role'>;
  minTeamRole: TeamMemberRole;
};

const RequireTeamAuthPage: React.FC<RequireTeamAuthProps> = (props) => {
  const isUserAuthorized = teamAuthUtils.isUserTeamRoleAtleast(
    props.currentUserTeamMembership.role,
    props.minTeamRole
  );

  if (!isUserAuthorized) {
    return <Navigate to="/" replace />;
  }
  return <>{props.children}</>;
};

export default RequireTeamAuthPage;
