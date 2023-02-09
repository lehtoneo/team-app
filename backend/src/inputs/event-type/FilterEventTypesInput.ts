import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class FilterEventTypesInput {
  @Field(() => Int, { nullable: false })
  teamId: number;
}
