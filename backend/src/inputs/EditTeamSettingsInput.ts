import { Field, InputType } from 'type-graphql';

@InputType()
export class EditTeamSettingsInput {
  @Field(() => String, { nullable: true })
  discordWebhookUrl?: string;

  @Field(() => Boolean, { nullable: false })
  discordNotificationsOn: boolean;
}
