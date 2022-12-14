import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class BaseEventInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ID, { nullable: true })
  typeId?: number;

  @Field(() => Date)
  start: Date;

  @Field(() => Date)
  end: Date;
}

@InputType()
export class CreateEventInput extends BaseEventInput {
  @Field(() => ID)
  teamId: number;
}
