import { InputType, Field, ID } from 'type-graphql';
import { BaseEventInput } from './CreateEventInput';

@InputType()
export class EditEventInput extends BaseEventInput {
  @Field(() => ID)
  id: number;
}
