import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class SaveAttendanceInput {
  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => Int)
  eventId: number;

  @Field(() => Boolean, { nullable: false })
  attendance: boolean;

  @Field(() => String, { nullable: true })
  reason?: string;
}
