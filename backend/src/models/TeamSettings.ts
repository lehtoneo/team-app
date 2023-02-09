import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class TeamSettings {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  discordWebhookUrl?: string;

  @Field(() => Boolean, { nullable: false })
  @Column({ nullable: false, default: false })
  discordNotificationsOn: boolean;

  @Field(() => Boolean, { nullable: false })
  @Column({ nullable: false, default: false })
  trollMessages: boolean;
}
