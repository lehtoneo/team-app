import { UserTeamRole } from './../graphql/queries/team';

const userTeamRoleValues: { [key in UserTeamRole]: number } = {
  MEMBER: 0,
  ADMIN: 1,
  OWNER: 2
};

const isUserRoleAtleast = (
  userTeamRole: UserTeamRole,
  minUserTeamRole: UserTeamRole
) => {
  const minUserRoleValue = userTeamRoleValues[minUserTeamRole];
  const userTeamRoleValue = userTeamRoleValues[userTeamRole];

  return userTeamRoleValue >= minUserRoleValue;
};

const teamAuthUtils = {
  isUserRoleAtleast
};

export default teamAuthUtils;
