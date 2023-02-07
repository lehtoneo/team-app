import teamAuthUtils from '../../utils/teamAuth';
import { TeamMembership } from '../../graphql/queries/team';

const teamRightSubjects = [
  'baseInfo',
  'joinLink',
  'settings',
  'event',
  'membership',
  'deleteTeam',
  'news'
] as const;

type TeamRightSubject = typeof teamRightSubjects[number];

const teamRightTypes = ['readRights', 'writeRights'] as const;
type TeamRightTypes = typeof teamRightTypes[number];

type TeamAuth = {
  [key in TeamRightSubject]: { [key in TeamRightTypes]: boolean };
};

interface TeamAuthParams {
  currentUserTeamMembership?: Pick<TeamMembership, 'role' | 'id'>;
  otherUserTeamMembership?: Pick<TeamMembership, 'role' | 'id'>;
}

const useTeamAuth = (params: TeamAuthParams | undefined) => {
  const currentUserTeamMembership = params?.currentUserTeamMembership;
  const otherUserTeamMembership = params?.otherUserTeamMembership;

  const role = currentUserTeamMembership?.role;
  const isAtleastMember = teamAuthUtils.isUserTeamRoleAtleast(role, 'MEMBER');
  const isAtleastAdmin = teamAuthUtils.isUserTeamRoleAtleast(role, 'ADMIN');
  const isAtleastOwner = teamAuthUtils.isUserTeamRoleAtleast(role, 'OWNER');

  const hasBiggerRoleThanOtherUser = teamAuthUtils.isUserTeamRoleBigger(
    role,
    otherUserTeamMembership?.role
  );

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
      readRights: isAtleastAdmin,
      writeRights: isAtleastOwner
    },
    deleteTeam: {
      readRights: isAtleastOwner,
      writeRights: isAtleastOwner
    },
    event: {
      readRights: isAtleastMember,
      writeRights: isAtleastAdmin
    },
    news: {
      readRights: isAtleastMember,
      writeRights: isAtleastAdmin
    },
    membership: {
      readRights: isAtleastMember,
      writeRights:
        hasBiggerRoleThanOtherUser &&
        !(otherUserTeamMembership?.role === 'OWNER')
    }
  };

  return { teamAuth };
};

export default useTeamAuth;
