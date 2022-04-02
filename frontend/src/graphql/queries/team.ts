import { gql } from '@apollo/client';

import { Event } from './event';
import { User } from './me';

export type TeamEvent = Pick<
  Event,
  'id' | 'description' | 'start' | 'end' | 'name' | 'team'
>;

interface TeamMembership {
  id: string;
  user: Pick<User, 'id' | 'firstname'>;
  team: Pick<Team, 'id'>;
  role: string;
}

export type TeamTeamMembership = Pick<TeamMembership, 'id' | 'user' | 'role'>;

export interface Team {
  id: number;
  description?: string;
  name: string;
  memberships: TeamTeamMembership[];
  events: TeamEvent[];
}

export type TeamQuerySuccessData = Pick<
  Team,
  'description' | 'id' | 'name' | 'memberships' | 'events'
>;

export interface TeamInput {
  id: number;
}

export const TEAM_QUERY = gql`
  query oneTeam($id: ID!) {
    oneTeam(id: $id) {
      id
      description
      name
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
      }
    }
  }
`;

export interface TeamQueryData {
  oneTeam?: TeamQuerySuccessData | null;
}
