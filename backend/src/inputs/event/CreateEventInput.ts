import { InputType, Field, ID, Int } from 'type-graphql';

@InputType()
export class BaseEventInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  typeId?: number;

  @Field(() => Date)
  start: Date;

  @Field(() => Date)
  end: Date;
}

@InputType()
export class CreateEventInput extends BaseEventInput {
  @Field(() => Int)
  teamId: number;
}
