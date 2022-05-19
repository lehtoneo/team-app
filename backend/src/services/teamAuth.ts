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

type CompareResult = -1 | 0 | 1;

/**
 * @param {TeamMemberRole} role1 - Role 1 to be compared
 * @param {TeamMemberRole} role2 - Role 2 to be compared
 * @returns {CompareResult} - Returns -1 if role1 is bigger, 0 if equal and 1 if role2 is bigger
 */
const compareUserTeamRole = (
  role1: TeamMemberRole,
  role2: TeamMemberRole
): CompareResult => {
  const userTeamRoleValue1 = userTeamRoleValues[role1];
  const userTeamRoleValue2 = userTeamRoleValues[role2];

  if (userTeamRoleValue1 === userTeamRoleValue2) {
    return 0;
  } else if (userTeamRoleValue1 > userTeamRoleValue2) {
    return -1;
  } else {
    return 1;
  }
};

const isUserTeamRoleAtleast = (
  userTeamRole: TeamMemberRole,
  minUserTeamRole: TeamMemberRole
) => {
  const compareResult = compareUserTeamRole(userTeamRole, minUserTeamRole);

  return compareResult <= 0;
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
  checkUserTeamRightsThrowsError,
  isUserTeamRoleAtleast,
  compareUserTeamRole,
  throwUnAuthorized
};

export default teamAuthService;
