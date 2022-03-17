import { Todo } from '../models/Todo';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateTodoInput implements Partial<Todo> {
  @Field()
  description: string;

  @Field({ nullable: true })
  done?: boolean;
}
