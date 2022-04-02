import { TeamMembership } from './TeamMembership';
import { Entity, Column, OneToMany, Generated } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
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
}
