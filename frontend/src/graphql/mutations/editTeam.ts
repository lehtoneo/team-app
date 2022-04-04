import { Team } from '../queries/team';

import { gql } from '@apollo/client';

interface EditTeamSettingsInput {
  discordWebhookUrl?: string | null;
  discordNotificationsOn: boolean;
}

export interface EditTeamInput {
  id: number;
  settings?: EditTeamSettingsInput;
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

export interface EditTeamData {
  editTeam: EditedTeamMutationResult | null;
}
