import { useMutation, gql, useQuery, QueryHookOptions } from '@apollo/client';
import { IConnection, PaginationInput } from '../commonTypes';
import { TeamNews } from '../mutations/createOrUpdateTeamNews';

export type TeamNewsNode = Pick<
  TeamNews,
  'id' | 'title' | 'description' | 'teamId' | 'createdAt'
>;
export type TeamNewsConnection = IConnection<TeamNewsNode>;

export interface NewsConnectionInput extends PaginationInput {
  teamId: number;
}

export const NEWS_CONNECTION_QUERY = gql`
  query NewsConnection(
    $teamId: Int!
    $first: Float
    $before: String
    $after: String
  ) {
    newsConnection(
      teamId: $teamId
      first: $first
      before: $before
      after: $after
    ) {
      edges {
        node {
          id
          teamId
          title
          description
          createdAt
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export interface NewsConnectionData {
  newsConnection?: TeamNewsConnection | null;
}

export function useNewsConnectionQuery(
  options?: QueryHookOptions<NewsConnectionData, NewsConnectionInput>
) {
  return useQuery<NewsConnectionData, NewsConnectionInput>(
    NEWS_CONNECTION_QUERY,
    options
  );
}
