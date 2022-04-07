import { Field, InputType } from 'type-graphql';

@InputType()
export class FilterDateInput {
  @Field({ nullable: true })
  max?: Date;
  @Field({ nullable: true })
  min?: Date;
}

@InputType()
export class FilterEventsInput {
  @Field({ nullable: true })
  futureEventsOnly?: boolean;

  @Field({ nullable: true })
  start?: FilterDateInput;

  @Field({ nullable: true })
  end?: FilterDateInput;
}
