import { Field, InputType } from 'type-graphql';

@InputType()
export class FilterEventsInput {
  @Field()
  futureEventsOnly?: boolean;
}
