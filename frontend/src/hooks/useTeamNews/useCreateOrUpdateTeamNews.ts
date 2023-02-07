import { ApolloError } from '@apollo/client';
import {
  CreateOrUpdateTeamNewsInput,
  CreateOrUpdateTeamNewsMutationResult,
  useCreateOrUpdateTeamNewsMutation
} from '../../graphql/mutations/createOrUpdateTeamNews';
import { unknownError, UnknownError } from '../../types';

type CreateOrUpdateEventNewsResult =
  | { success: true; teamNews: CreateOrUpdateTeamNewsMutationResult }
  | { success: false; teamNews?: null; error: ApolloError | UnknownError };
const useCreateOrUpdateTeamNews = () => {
  const [createOrUpdateMutation, { error }] =
    useCreateOrUpdateTeamNewsMutation();
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
