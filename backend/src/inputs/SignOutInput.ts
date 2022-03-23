import { InputType, Field } from 'type-graphql';

@InputType()
export class SignOutInput {
  @Field()
  refreshToken: string;
}
