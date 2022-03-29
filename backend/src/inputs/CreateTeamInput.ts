import { Team } from '../models/Team';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateTeamInput implements Partial<Team> {
  @Field()
  description: string;

  @Field({ nullable: true })
  done?: boolean;
}
