import { Team } from '../models/Team';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateTeamInput implements Partial<Team> {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
