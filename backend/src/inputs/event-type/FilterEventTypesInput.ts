import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class FilterEventTypesInput {
  @Field(() => ID, { nullable: false })
  teamId: number;
}
