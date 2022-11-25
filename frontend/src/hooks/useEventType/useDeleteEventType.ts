import { useDeleteEventTypeMutation } from '../../graphql/mutations/event/deleteEventType';

const useDeleteEventType = () => {
  const [deleteMutation, { loading }] = useDeleteEventTypeMutation();

  const deleteEventType = async (id: number) => {
    try {
      const result = await deleteMutation({
        variables: { id },
        update(cache) {
          const normalizedId = cache.identify({
            id: id,
            __typename: 'EventType'
          });
          cache.evict({ id: normalizedId });
          cache.gc();
        }
      });
      if (result.data?.deleteEventType) {
        return {
          success: true
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
    deleteEventType,
    loading
  };
};

export default useDeleteEventType;
