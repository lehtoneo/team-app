import { useMutation, gql, useQuery, QueryHookOptions } from '@apollo/client';
import { IConnection } from '../commonTypes';
import { TeamNews } from '../mutations/createOrUpdateTeamNews';

export type TeamNewsNode = Pick<
  TeamNews,
  'id' | 'title' | 'description' | 'teamId'
>;
export type TeamNewsConnection = IConnection<TeamNewsNode>;

export interface NewsConnectionInput {
  teamId: number;
  first?: number;
  before?: string;
  after?: string;
}

export const NEWS_CONNECTION_QUERY = gql`
  query NewsConnection(
    $teamId: ID!
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
