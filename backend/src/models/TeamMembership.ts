import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Dates } from './IdAndDates';

import { User } from './User';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Team } from './Team';

export enum UserTeamRole {
  MEMBER = 'MEMBER',
  OWNER = 'OWNER'
}

registerEnumType(UserTeamRole, {
  name: 'UserTeamRole', // this one is mandatory
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
  @ManyToOne(() => User, (user) => user.teams)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => Team)
  @ManyToOne(() => Team, (team) => team.memberships, { lazy: true })
  @JoinColumn({ name: 'teamId' })
  team: Promise<Team>;

  @Field(() => UserTeamRole, { nullable: true, defaultValue: 'MEMBER' })
  @Column({
    type: 'enum',
    enum: UserTeamRole,
    default: UserTeamRole.MEMBER
  })
  role: UserTeamRole;

  @Field(() => TeamMembership, { nullable: true })
  currentUserTeamMembership?: TeamMembership;
}
