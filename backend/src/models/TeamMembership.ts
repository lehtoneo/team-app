import { TeamMemberStatistics } from '../extra-graphql-types/TeamMemberStatistics';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Dates } from './IdAndDates';

import { User } from './User';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Team } from './Team';

export enum TeamMemberRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER'
}

registerEnumType(TeamMemberRole, {
  name: 'TeamMemberRole', // this one is mandatory
  description: 'The role of user in a team' // this one is optional
});

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
  @ManyToOne(() => Team, (team) => team.memberships, {
    lazy: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'teamId' })
  team: Promise<Team>;

  @Field(() => TeamMemberRole, { nullable: true, defaultValue: 'MEMBER' })
  @Column({
    type: 'enum',
    enum: TeamMemberRole,
    default: TeamMemberRole.MEMBER
  })
  role: TeamMemberRole;

  @Field(() => TeamMemberStatistics)
  statistics: Promise<TeamMemberStatistics>;
}
