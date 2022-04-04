import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class TeamSettings {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  discordWebhookUrl?: string;

  @Field(() => Boolean, { nullable: false })
  @Column({ nullable: false, default: false })
  discordNotificationsOn: boolean;
}
