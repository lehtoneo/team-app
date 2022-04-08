import { TeamMemberStatistics } from '../extra-graphql-types/TeamMemberStatistics';
import { TeamMembership } from './../models/TeamMembership';
import { Resolver, FieldResolver, Root, ID } from 'type-graphql';

@Resolver(() => TeamMembership)
export default class TeamMembershipResolver {
  @FieldResolver(() => ID)
  async id(@Root() teamMembership: TeamMembership) {
    const teamId = teamMembership.teamId;
    const userId = teamMembership.userId;

    return `${teamId}-${userId}`;
  }

  @FieldResolver(() => TeamMemberStatistics)
  async statistics(@Root() teamMembership: TeamMembership) {
    const statistics = new TeamMemberStatistics();
    statistics.membership = teamMembership;
    return statistics;
  }
}
