import { TeamMembership } from './../models/TeamMembership';
import AppDataSource from '../data-source';
import { TeamMemberRole } from '../models/TeamMembership';
import { AuthenticationError } from 'apollo-server-express';
import { User } from '../models/User';
import { Team } from '../models/Team';

const teamMembershipRepository = AppDataSource.getRepository(TeamMembership);

const throwUnAuthorized = (): never => {
  throw new AuthenticationError('Unauthorized');
};

const userTeamRoleValues: { [key in TeamMemberRole]: number } = {
  MEMBER: 0,
  ADMIN: 1,
  OWNER: 2
};

const isUserTeamRoleAtleast = (
  userTeamRole: TeamMemberRole,
  minUserTeamRole: TeamMemberRole
) => {
  const minUserRoleValue = userTeamRoleValues[minUserTeamRole];
  const userTeamRoleValue = userTeamRoleValues[userTeamRole];

  return userTeamRoleValue >= minUserRoleValue;
};

const checkUserTeamRightsThrowsError = async (
  user: User | number,
  team: Team | number,
  minUserRole: TeamMemberRole
) => {
  const userId = typeof user === 'number' ? user : user.id;
  const teamId = typeof team === 'number' ? team : team.id;

  const userTeamMembership = await teamMembershipRepository.findOneBy({
    userId,
    teamId
  });

  if (!userTeamMembership) return throwUnAuthorized();

  const userTeamRole = userTeamMembership.role;

  if (!isUserTeamRoleAtleast(userTeamRole, minUserRole)) {
    return throwUnAuthorized();
  } else {
    return 'authorized';
  }
};

const teamAuthService = {
  checkUserTeamRightsThrowsError
};

export default teamAuthService;
