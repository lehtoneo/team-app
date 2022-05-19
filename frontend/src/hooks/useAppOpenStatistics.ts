import {
  APP_OPEN_STATISTICS_QUERY,
  AppOpenStatisticsData
} from './../graphql/queries/appOpenStatistics';
import { useQuery } from '@apollo/client';

const useAppOpenStatistics = () => {
  const { data, loading } = useQuery<AppOpenStatisticsData>(
    APP_OPEN_STATISTICS_QUERY
  );

  return {
    appOpenStatistics: data?.appOpenStatistics,
    loading
  };
};

export default useAppOpenStatistics;
