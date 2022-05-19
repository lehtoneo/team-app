import { Field, ID, InputType } from 'type-graphql';
import { TeamBaseInfo } from '../../models/Team';

@InputType()
export class EditTeamSettingsInput {
  @Field(() => String, { nullable: true })
  discordWebhookUrl?: string;

  @Field(() => Boolean, { nullable: false })
  discordNotificationsOn: boolean;

  @Field(() => Boolean, { nullable: false })
  trollMessages: boolean;
}

@InputType()
export class EditTeamBaseInfoInput implements TeamBaseInfo {
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: true })
  description?: string;
}

@InputType()
export class EditTeamInput {
  @Field(() => ID)
  id: number;

  @Field(() => EditTeamBaseInfoInput, { nullable: true })
  baseInfo?: EditTeamBaseInfoInput;

  @Field(() => EditTeamSettingsInput, { nullable: true })
  settings?: EditTeamSettingsInput;

  @Field(() => Boolean, { nullable: true })
  regenerateJoinId?: boolean;
}
