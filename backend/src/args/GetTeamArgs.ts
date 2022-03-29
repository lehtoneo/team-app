import { ArgsType, ID, Field } from 'type-graphql';

@ArgsType()
export class GetTeamArgs {
  @Field(() => ID, { nullable: false })
  id: number;
}
