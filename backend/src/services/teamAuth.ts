import { TeamMembership } from './../models/TeamMembership';
import AppDataSource from '../data-source';
import { UserTeamRole } from '../models/TeamMembership';
import { AuthenticationError } from 'apollo-server-express';
import { User } from '../models/User';
import { Team } from '../models/Team';

const teamMembershipRepository = AppDataSource.getRepository(TeamMembership);

const throwUnAuthorized = (): never => {
  throw new AuthenticationError('UnAuthorized');
};

const userTeamRoleValues: { [key in UserTeamRole]: number } = {
  MEMBER: 0,
  OWNER: 1
};

const checkUserTeamRightsThrowsError = async (
  user: User | number,
  team: Team | number,
  minUserRole: UserTeamRole
) => {
  const userId = typeof user === 'number' ? user : user.id;
  const teamId = typeof team === 'number' ? team : team.id;
  const minUserRoleValue = userTeamRoleValues[minUserRole];

  const userTeamMembership = await teamMembershipRepository.findOneBy({
    userId,
    teamId
  });

  if (!userTeamMembership) return throwUnAuthorized();

  const userTeamRole = userTeamMembership.role;
  const userTeamRoleValue = userTeamRoleValues[userTeamRole];

  if (userTeamRoleValue < minUserRoleValue) {
    return throwUnAuthorized();
  } else {
    return 'authorized';
  }
};

const teamAuthService = {
  checkUserTeamRightsThrowsError
};

export default teamAuthService;
