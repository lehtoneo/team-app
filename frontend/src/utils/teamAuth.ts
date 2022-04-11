import { TeamMemberRole } from './../graphql/queries/team';

const userTeamRoleValues: { [key in TeamMemberRole]: number } = {
  MEMBER: 0,
  ADMIN: 1,
  OWNER: 2
};

const isUserTeamRoleAtleast = (
  userTeamRole: TeamMemberRole | undefined,
  minUserTeamRole: TeamMemberRole
) => {
  if (!userTeamRole) {
    return false;
  }
  const minUserRoleValue = userTeamRoleValues[minUserTeamRole];
  const userTeamRoleValue = userTeamRoleValues[userTeamRole];

  return userTeamRoleValue >= minUserRoleValue;
};

const teamAuthUtils = {
  isUserTeamRoleAtleast
};

export default teamAuthUtils;
