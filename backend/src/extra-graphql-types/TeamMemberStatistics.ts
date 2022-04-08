import { ObjectType, Field, Int, Float } from 'type-graphql';
import { TeamMembership } from '../models/TeamMembership';

@ObjectType()
export class TeamMemberStatistics {
  membership: TeamMembership;

  @Field(() => Int)
  pastEventsAttendanceCount: number;

  @Field(() => Float)
  pastEventsAttendanceRatio: number;
}
