import { useNewsConnectionQuery } from '../../graphql/queries/newsConnection';

const useTeamNewsConnection = (id: number) => {
  const t = useNewsConnectionQuery({
    variables: {
      teamId: id
    }
  });

  return {
    data: t.data
  };
};

export default useTeamNewsConnection;
