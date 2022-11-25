import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class CreateOrUpdateEventTypeInput {
  @Field(() => Number, { nullable: true })
  id?: number;

  @Field(() => Number)
  teamId: number;
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  color?: string;
}
