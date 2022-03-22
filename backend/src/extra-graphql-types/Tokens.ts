import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Tokens {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
