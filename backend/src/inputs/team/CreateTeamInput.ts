import { TeamBaseInfo } from '../../models/Team';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateTeamInput implements TeamBaseInfo {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
