import { InputType, Field, ID, Int } from 'type-graphql';

@InputType()
export class GetOneTeamInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  joinId?: string;
}
