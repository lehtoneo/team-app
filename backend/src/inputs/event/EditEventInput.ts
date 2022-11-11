import { InputType, Field, ID } from 'type-graphql';
import { BaseEventInput } from './CreateEventInput';

@InputType()
export class EditEventInput {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date)
  start: Date;

  @Field(() => Date)
  end: Date;
}
