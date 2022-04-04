import { EditTeamSettingsInput } from './EditTeamSettingsInput';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class EditTeamInput {
  @Field(() => ID)
  id: number;

  @Field(() => EditTeamSettingsInput)
  settings?: EditTeamSettingsInput;
}
