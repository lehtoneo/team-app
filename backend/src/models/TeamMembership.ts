import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Dates } from './IdAndDates';

import { User } from './User';
import { Field, ObjectType } from 'type-graphql';
import { Team } from './Team';

@ObjectType()
@Entity()
export class TeamMembership extends Dates {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  teamId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.teams, { lazy: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @Field(() => Team)
  @ManyToOne(() => Team, (team) => team.memberships, { lazy: true })
  @JoinColumn({ name: 'teamId' })
  team: Promise<Team>;

  @Field(() => String, { nullable: true, defaultValue: 'MEMBER' })
  @Column({ nullable: true, default: 'MEMBER' })
  role?: string;

  @Field(() => TeamMembership, { nullable: true })
  currentUserTeamMembership?: TeamMembership;
}
