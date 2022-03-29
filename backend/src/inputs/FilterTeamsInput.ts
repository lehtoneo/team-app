import { InputType, Field } from 'type-graphql';

@InputType()
export class FilterTeamsInput {
  @Field(() => String)
  name?: string;

  @Field(() => Boolean)
  ownTeamsOnly?: boolean;
}
