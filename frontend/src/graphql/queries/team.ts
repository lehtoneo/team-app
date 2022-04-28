import { gql } from '@apollo/client';

import { User } from './me';

export const teamMemberRoles = ['OWNER', 'MEMBER', 'ADMIN'] as const;

export type TeamMemberRole = typeof teamMemberRoles[number];

interface TeamMemberStatistics {
  pastEventsAttendanceCount: number;
  pastEventsAttendanceRatio: number;
}

export interface TeamMembership {
  id: number;
  user: Pick<User, 'id' | 'firstname'>;
  team: Pick<Team, 'id'>;
  role: TeamMemberRole;
  statistics: TeamMemberStatistics;
}

export type TeamTeamMembership = Pick<
  TeamMembership,
  'id' | 'user' | 'role' | 'statistics'
>;
export interface TeamSettings {
  id: number;
  discordWebhookUrl: string | null;
  discordNotificationsOn: boolean;
  trollMessages: boolean;
}

export interface TeamBaseInfo {
  description?: string;
  name: string;
}

export interface Team extends TeamBaseInfo {
  id: number;
  memberships: TeamTeamMembership[];
  currentUserTeamMembership: Pick<TeamMembership, 'id' | 'role'>;
  joinId: string | null;
  settings: TeamSettings | null;
  pastEventsCount: number;
}

export type TeamQuerySuccessData = Pick<
  Team,
  | 'description'
  | 'id'
  | 'name'
  | 'memberships'
  | 'currentUserTeamMembership'
  | 'joinId'
  | 'settings'
  | 'pastEventsCount'
>;

interface GetTeamById {
  id: number;
  joinId?: undefined;
}
interface GetTeamByJoinId {
  id?: undefined;
  joinId: string;
}
export type GetOneTeamInput = GetTeamById | GetTeamByJoinId;

export const TEAM_QUERY = gql`
  query oneTeam($getOneTeamInput: GetOneTeamInput!) {
    oneTeam(getOneTeamInput: $getOneTeamInput) {
      id
      pastEventsCount
      description
      name
      joinId
      settings {
        id
        discordWebhookUrl
        discordNotificationsOn
        trollMessages
      }
      currentUserTeamMembership {
        id
        role
      }
      memberships {
        id
        role
        user {
          id
          firstname
        }
        statistics {
          pastEventsAttendanceCount
          pastEventsAttendanceRatio
        }
      }
    }
  }
`;

export interface TeamQueryData {
  oneTeam?: TeamQuerySuccessData | null;
}
