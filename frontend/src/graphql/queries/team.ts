import { gql } from '@apollo/client';

import { Event } from './event';
import { User } from './me';

export type TeamEvent = Pick<
  Event,
  | 'id'
  | 'description'
  | 'start'
  | 'end'
  | 'name'
  | 'team'
  | 'currentUserEventAttendance'
>;

type TeamMembershipRole = 'OWNER' | 'MEMBER';

interface TeamMembership {
  id: number;
  user: Pick<User, 'id' | 'firstname'>;
  team: Pick<Team, 'id'>;
  role: TeamMembershipRole;
}

export type TeamTeamMembership = Pick<TeamMembership, 'id' | 'user' | 'role'>;
export interface TeamSettings {
  id: number;
  discordWebhookUrl: string | null;
  discordNotificationsOn: boolean;
}

export interface Team {
  id: number;
  description?: string;
  name: string;
  memberships: TeamTeamMembership[];
  events: TeamEvent[];
  currentUserTeamMembership: Pick<TeamMembership, 'id' | 'role'>;
  joinId: string | null;
  settings: TeamSettings | null;
}

export type TeamQuerySuccessData = Pick<
  Team,
  | 'description'
  | 'id'
  | 'name'
  | 'memberships'
  | 'events'
  | 'currentUserTeamMembership'
  | 'joinId'
  | 'settings'
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
      description
      name
      joinId
      settings {
        id
        discordWebhookUrl
        discordNotificationsOn
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
      }
      events {
        id
        name
        description
        start
        end
        team {
          id
        }
        currentUserEventAttendance {
          id
          createdAt
          attendance
          userId
          reason
        }
      }
    }
  }
`;

export interface TeamQueryData {
  oneTeam?: TeamQuerySuccessData | null;
}