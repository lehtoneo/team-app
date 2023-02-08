import { ApolloError, useApolloClient } from '@apollo/client';
import {
  CreateOrUpdateTeamNewsInput,
  CreateOrUpdateTeamNewsMutationResult,
  useCreateOrUpdateTeamNewsMutation
} from '../../graphql/mutations/createOrUpdateTeamNews';
import {
  NewsConnectionData,
  NEWS_CONNECTION_QUERY,
  TeamNewsConnection
} from '../../graphql/queries/newsConnection';
import { unknownError, UnknownError } from '../../types';

type CreateOrUpdateEventNewsResult =
  | { success: true; teamNews: CreateOrUpdateTeamNewsMutationResult }
  | { success: false; teamNews?: null; error: ApolloError | UnknownError };
const useCreateOrUpdateTeamNews = () => {
  const [createOrUpdateMutation, { error }] = useCreateOrUpdateTeamNewsMutation(
    {
      update(cache, { data: updateData }) {
        const newNews = updateData?.createOrUpdateTeamNews;
        if (newNews) {
          cache.updateQuery(
            {
              query: NEWS_CONNECTION_QUERY,
              variables: { teamId: newNews.teamId }
            },
            (data: { newsConnection: TeamNewsConnection } | null) => {
              console.log(data);
              if (!data?.newsConnection) {
                return;
              }
              const existingEdges = data.newsConnection.edges;
              const isInConnectionAlready = existingEdges.find(
                (e) => e.node.id === newNews.id
              );
              if (isInConnectionAlready) {
                return;
              }
              let newEdges = [
                {
                  node: { ...newNews },
                  cursor: newNews.createdAt
                },
                ...existingEdges
              ];

              return {
                newsConnection: {
                  ...data.newsConnection,
                  edges: newEdges
                }
              };
            }
          );
        }
      }
    }
  );
  const createOrUpdate = async (
    variables: CreateOrUpdateTeamNewsInput
  ): Promise<CreateOrUpdateEventNewsResult> => {
    try {
      const result = await createOrUpdateMutation({
        variables: { createOrUpdateTeamNewsInput: variables }
      });
      console.log(result);
      if (result.data?.createOrUpdateTeamNews) {
        return {
          success: true,
          teamNews: result.data.createOrUpdateTeamNews
        };
      } else {
        return {
          success: false,
          error: unknownError
        };
      }
    } catch (e: any) {
      if (e instanceof ApolloError) {
        return {
          success: false,
          error: e
        };
      }
      return {
        success: false,
        error: unknownError
      };
    }
  };
  return { createOrUpdate, error };
};

export default useCreateOrUpdateTeamNews;
