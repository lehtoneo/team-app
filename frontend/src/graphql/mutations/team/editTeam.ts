import { Team, TeamBaseInfo } from '../../queries/team';

import { gql, useMutation } from '@apollo/client';

interface EditTeamSettingsInput {
  discordWebhookUrl?: string | null;
  discordNotificationsOn: boolean;
  trollMessages: boolean;
}

interface EditTeamBaseInfoInput extends TeamBaseInfo {}

export interface EditTeamInput {
  id: number;
  settings?: EditTeamSettingsInput;
  baseInfo?: EditTeamBaseInfoInput;
}

export type EditedTeamMutationResult = Pick<
  Team,
  'id' | 'description' | 'name' | 'settings'
>;

export const EDIT_TEAM = gql`
  mutation editTeam($editTeamInput: EditTeamInput!) {
    editTeam(editTeamInput: $editTeamInput) {
      id
      name
      description
      settings {
        id
        discordWebhookUrl
        discordNotificationsOn
      }
    }
  }
`;

export interface EditTeamResponse {
  editTeam: EditedTeamMutationResult | null;
}

export function useEditTeamMutation() {
  return useMutation<EditTeamResponse, { editTeamInput: EditTeamInput }>(
    EDIT_TEAM
  );
}
