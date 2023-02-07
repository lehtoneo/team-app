import { gql, useMutation } from '@apollo/client';
import { IDAndDatesEntity } from '../commonTypes';

export interface TeamNews extends IDAndDatesEntity {
  title: string;
  description: string;
  teamId: number;
}

export type CreateOrUpdateTeamNewsMutationResult = Pick<
  TeamNews,
  'id' | 'description' | 'teamId' | 'title'
>;

export interface CreateOrUpdateTeamNewsInput {
  id?: string;
  teamId?: string;
  title: string;
  description: string;
}

export const CREATE_OR_UPDATE_TEAMNEWS_MUTATION = gql`
  mutation Mutation(
    $createOrUpdateTeamNewsInput: CreateOrUpdateTeamNewsInput!
  ) {
    createOrUpdateTeamNews(
      createOrUpdateTeamNewsInput: $createOrUpdateTeamNewsInput
    ) {
      description
      id
      teamId
      title
    }
  }
`;

export interface CreateOrUpdateTeamNewsData {
  createOrUpdateTeamNews: CreateOrUpdateTeamNewsMutationResult | null;
}

export function useCreateOrUpdateTeamNewsMutation() {
  return useMutation<
    CreateOrUpdateTeamNewsData,
    { createOrUpdateTeamNewsInput: CreateOrUpdateTeamNewsInput }
  >(CREATE_OR_UPDATE_TEAMNEWS_MUTATION, {});
}
