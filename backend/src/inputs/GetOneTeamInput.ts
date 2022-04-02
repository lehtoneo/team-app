import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class GetOneTeamInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  joinId?: string;
}
