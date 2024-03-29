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
import { TeamNews } from './TeamNews';

export interface TeamBaseInfo {
  name: string;
  description?: string;
}

@Entity()
@ObjectType()
export class Team extends IdAndDates implements TeamBaseInfo {
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
  @OneToOne(() => TeamSettings, { lazy: true, cascade: true })
  @JoinColumn({ name: 'settingsId' })
  settings: Promise<TeamSettings>;

  @OneToOne(() => TeamNews, { lazy: true, cascade: true })
  @JoinColumn({ name: 'newsId' })
  news: Promise<TeamNews>;

  @Field(() => Int, { nullable: false })
  pastEventsCount: Promise<number>;
}
