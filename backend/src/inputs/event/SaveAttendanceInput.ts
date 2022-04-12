import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class SaveAttendanceInput {
  @Field(() => ID, { nullable: true })
  userId?: number;

  @Field(() => ID)
  eventId: number;

  @Field(() => Boolean, { nullable: false })
  attendance: boolean;

  @Field(() => String, { nullable: true })
  reason?: string;
}
