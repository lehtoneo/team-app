import { Todo } from './../../../frontend/src/types/index';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateTodoInput implements Partial<Todo> {
  @Field()
  description: string;

  @Field({ nullable: true })
  done?: boolean;
}
