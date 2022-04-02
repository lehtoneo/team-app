import { InputType, Field } from 'type-graphql';

@InputType()
export class JoinTeamInput {
  @Field(() => String, { nullable: false })
  joinId: string;
}
