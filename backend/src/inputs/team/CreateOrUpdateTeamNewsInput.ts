import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateOrUpdateTeamNewsInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Int, { nullable: true })
  teamId?: number;
}
