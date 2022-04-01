import { Team } from './../commonTypes';

import { gql } from '@apollo/client';

export interface CreateTeamEventInput {
  name: string;
  description?: string;
  start: Date;
  end: Date;
  teamId: number;
}

export type CreatedTeamEventMutationResult = Event;

export const CREATE_TEAM_EVENT = gql`
  mutation createTeamEvent($createTeamEventInput: CreateTeamEventInput!) {
    createTeamEvent(createTeamEventInput: $createTeamEventInput) {
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
`;

export interface CreateTeamEventData {
  createTeamEvent: CreatedTeamEventMutationResult | null;
}
