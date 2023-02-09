import { InputType, Field, ID, Int } from 'type-graphql';

@InputType()
export class CreateOrUpdateEventTypeInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Number)
  teamId: number;
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  color?: string;
}
