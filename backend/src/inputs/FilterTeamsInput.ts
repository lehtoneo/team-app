import { InputType, Field } from 'type-graphql';

@InputType()
export class FilterTeamsInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Boolean, { nullable: true })
  ownTeamsOnly?: boolean;
}
