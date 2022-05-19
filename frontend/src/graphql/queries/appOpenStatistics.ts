import { gql } from '@apollo/client';
export interface AppOpenStatistics {
  eventCount: number;
  userCount: number;
  teamCount: number;
}

export const APP_OPEN_STATISTICS_QUERY = gql`
  query AppOpenStatistics {
    appOpenStatistics {
      teamCount
      eventCount
      userCount
    }
  }
`;

export interface AppOpenStatisticsData {
  appOpenStatistics: AppOpenStatistics | null;
}
