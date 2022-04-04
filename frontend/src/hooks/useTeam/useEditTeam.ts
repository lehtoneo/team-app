import { unknownError } from './../../types/index';
import {
  EditTeamInput,
  EDIT_TEAM,
  EditTeamData
} from './../../graphql/mutations/editTeam';
import { useMutation, ApolloError } from '@apollo/client';
const useEditTeam = () => {
  const [editTeamMutation, { error }] = useMutation<
    EditTeamData,
    { editTeamInput: EditTeamInput }
  >(EDIT_TEAM);

  const editTeam = async (params: EditTeamInput) => {
    try {
      const result = await editTeamMutation({
        variables: {
          editTeamInput: {
            ...params
          }
        }
      });
      if (result.data?.editTeam) {
        return {
          success: true,
          team: result.data.editTeam
        };
      } else {
        return {
          success: false,
          error: unknownError
        };
      }
    } catch (e) {
      if (e instanceof ApolloError) {
        return {
          success: false,
          error: e
        };
      } else {
        return {
          success: false,
          error: unknownError
        };
      }
    }
  };

  return {
    editTeam,
    error
  };
};

export default useEditTeam;
