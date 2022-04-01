import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class CreateTeamEventInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ID)
  teamId: number;

  @Field(() => Date)
  start: Date;

  @Field(() => Date)
  end: Date;
}
