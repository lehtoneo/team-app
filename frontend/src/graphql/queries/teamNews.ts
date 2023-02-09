import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { GetByIdArgs } from '../commonTypes';
import { TeamNews } from '../mutations/createOrUpdateTeamNews';

type TeamNewsQueryResult = Pick<
  TeamNews,
  'createdAt' | 'description' | 'updatedAt' | 'id' | 'title' | 'teamId'
>;

export type OneTeamNewsInput = GetByIdArgs;

export const ONE_TEAM_NEWS_QUERY = gql`
  query OneTeamNews($id: Int!) {
    oneTeamNews(id: $id) {
      createdAt
      description
      id
      teamId
      title
      updatedAt
    }
  }
`;

export interface OneTeamNewsQueryData {
  oneTeamNews: TeamNewsQueryResult | null;
}

export const useTeamNewsQuery = (
  options: QueryHookOptions<OneTeamNewsQueryData, OneTeamNewsInput>
) => {
  return useQuery<OneTeamNewsQueryData, OneTeamNewsInput>(
    ONE_TEAM_NEWS_QUERY,
    options
  );
};
