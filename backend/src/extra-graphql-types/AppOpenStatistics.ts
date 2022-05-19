import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class AppOpenStatistics {
  @Field(() => Int)
  teamCount: number;

  @Field(() => Int)
  eventCount: number;

  @Field(() => Int)
  userCount: number;
}
