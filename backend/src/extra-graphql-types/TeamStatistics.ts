import { ObjectType, Field, Float, ID, Int } from 'type-graphql';
import { User } from '../models/User';

@ObjectType()
export class TeamMemberAttendanceRate {
  @Field(() => User)
  user: User;

  @Field(() => Int)
  pastEventsAttendanceCount: number;
}

@ObjectType()
export class TeamStatistics {
  @Field(() => ID)
  teamId: number;
  @Field(() => [TeamMemberAttendanceRate])
  memberAttendanceRates: Promise<[TeamMemberAttendanceRate]>;

  @Field(() => Int)
  totalPastEvents: Promise<number>;
}
