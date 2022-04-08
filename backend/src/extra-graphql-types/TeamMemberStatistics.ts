import { ObjectType, Field, Int } from 'type-graphql';
import { TeamMembership } from '../models/TeamMembership';

@ObjectType()
export class TeamMemberStatistics {
  membership: TeamMembership;

  @Field(() => Int)
  pastEventsAttendanceCount: number;
}
