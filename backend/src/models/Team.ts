import { TeamSettings } from './TeamSettings';
import { TeamMembership } from './TeamMembership';
import {
  Entity,
  Column,
  OneToMany,
  Generated,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { IdAndDates } from './IdAndDates';
import { Event } from './Event';

@Entity()
@ObjectType()
export class Team extends IdAndDates {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => TeamMembership, (membership) => membership.team, {
    lazy: true
  })
  @Field(() => [TeamMembership])
  memberships: Promise<TeamMembership[]>;

  @OneToMany(() => Event, (event) => event.team, { lazy: true })
  @Field(() => [Event])
  events: Promise<Event[]>;

  @Field(() => String, { nullable: true })
  @Column()
  @Generated('uuid')
  joinId: string;

  @Column({ nullable: true })
  settingsId?: number;

  @Field(() => TeamSettings, { nullable: true })
  @OneToOne(() => TeamSettings, { lazy: true })
  @JoinColumn({ name: 'settingsId' })
  settings: Promise<TeamSettings>;

  @Field(() => Int, { nullable: false })
  pastEventsCount: Promise<number>;
}
