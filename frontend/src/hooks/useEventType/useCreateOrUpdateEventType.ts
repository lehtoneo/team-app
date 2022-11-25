import {
  CreateEventTypeInput,
  EventTypeMutationResult,
  useCreateOrUpdateEventMutation
} from '../../graphql/mutations/event/createOrUpdateEventType';

type CreateOrUpdateEventTypeResult =
  | { success: true; eventType: EventTypeMutationResult }
  | { success: false; eventType?: null };

const useCreateOrUpdateEventType = () => {
  const [createOrUpdateMutation, loading] = useCreateOrUpdateEventMutation();
  const createOrUpdate = async (
    variables: CreateEventTypeInput
  ): Promise<CreateOrUpdateEventTypeResult> => {
    try {
      const result = await createOrUpdateMutation({
        variables: { createOrUpdateEventTypeInput: variables }
      });
      if (result.data?.createOrUpdateEventType) {
        return {
          success: true,
          eventType: result.data.createOrUpdateEventType
        };
      }

      return {
        success: false
      };
    } catch (e) {
      return {
        success: false
      };
    }
  };

  return {
    createOrUpdate,
    loading
  };
};

export default useCreateOrUpdateEventType;
