import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  firstname: string;

  @Field()
  password: string;
}
