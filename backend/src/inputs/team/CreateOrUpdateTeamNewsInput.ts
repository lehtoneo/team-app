import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class CreateOrUpdateTeamNewsInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => ID, { nullable: true })
  teamId?: number;
}
