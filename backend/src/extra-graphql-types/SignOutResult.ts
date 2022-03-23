import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class SignOutResult {
  @Field(() => Boolean)
  success: boolean;
}
