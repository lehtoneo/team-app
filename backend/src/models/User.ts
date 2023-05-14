import { TeamMembership } from './TeamMembership';
import { UserEventAttendance } from './UserEventAttendance';
import { RefreshToken } from './UserRefreshToken';
import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IdAndDates } from './IdAndDates';
import { IsEmail } from 'class-validator';
import { Weight } from './Weight';

@Entity()
@ObjectType()
export class User extends IdAndDates {
  @Field(() => String)
  @IsEmail()
  @Column({ unique: true, nullable: false })
  email: string;

  @Field(() => String)
  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  passwordHash: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Weight, (weight) => weight.user, { lazy: true })
  weights: Weight[];

  @OneToMany(
    () => UserEventAttendance,
    (eventAttendance) => eventAttendance.user,
    { lazy: true }
  )
  eventAttendances: UserEventAttendance[];

  @OneToMany(() => TeamMembership, (membership) => membership.user, {
    lazy: true,
    cascade: true
  })
  @Field(() => [TeamMembership])
  teams: Promise<TeamMembership[]>;
}
