import { Team } from '../../queries/team';

import { gql } from '@apollo/client';

export interface CreateTeamInput {
  name: string;
  description?: string;
}

export type CreatedTeamMutationResult = Pick<
  Team,
  'id' | 'description' | 'name'
>;

export const CREATE_TEAM = gql`
  mutation createTeam($createTeamInput: CreateTeamInput!) {
    createTeam(createTeamInput: $createTeamInput) {
      id
      name
      description
    }
  }
`;

export interface CreateTeamData {
  createTeam: CreatedTeamMutationResult | null;
}
