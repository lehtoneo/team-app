import teamAuthUtils from '../../utils/teamAuth';
import { TeamMembership } from '../../graphql/queries/team';

const teamRightSubjects = [
  'baseInfo',
  'joinLink',
  'settings',
  'event'
] as const;

type TeamRightSubject = typeof teamRightSubjects[number];

const teamRightTypes = ['readRights', 'writeRights'] as const;
type TeamRightTypes = typeof teamRightTypes[number];

type TeamAuth = {
  [key in TeamRightSubject]: { [key in TeamRightTypes]: boolean };
};

const useTeamAuth = (
  currentUserTeamMembership?: Pick<TeamMembership, 'role'>
) => {
  const role = currentUserTeamMembership?.role;
  const isAtleastMember = teamAuthUtils.isUserTeamRoleAtleast(role, 'MEMBER');
  const isAtleastAdmin = teamAuthUtils.isUserTeamRoleAtleast(role, 'ADMIN');
  const isAtleastOwner = teamAuthUtils.isUserTeamRoleAtleast(role, 'OWNER');

  const teamAuth: TeamAuth = {
    baseInfo: {
      readRights: true,
      writeRights: isAtleastOwner
    },
    joinLink: {
      readRights: isAtleastAdmin,
      writeRights: isAtleastOwner
    },
    settings: {
      readRights: isAtleastOwner,
      writeRights: isAtleastOwner
    },
    event: {
      readRights: isAtleastMember,
      writeRights: isAtleastAdmin
    }
  };

  return { teamAuth };
};

export default useTeamAuth;
