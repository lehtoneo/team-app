import { useTeamNewsQuery } from '../../graphql/queries/teamNews';

const useTeamNews = (id?: number) => {
  const query = useTeamNewsQuery({
    variables: { id: id || -1 },
    skip: id === undefined
  });

  return {
    data: query.data?.oneTeamNews,
    loading: query.loading
  };
};

export default useTeamNews;
