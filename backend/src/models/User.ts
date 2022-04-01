import { UserEventAttendance } from './UserEventAttendance';
import { RefreshToken } from './UserRefreshToken';
import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IdAndDates } from './IdAndDates';
import { IsEmail } from 'class-validator';
import { Team } from './Team';

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

  @OneToMany(
    () => UserEventAttendance,
    (eventAttendance) => eventAttendance.user,
    { lazy: true }
  )
  eventAttendances: UserEventAttendance[];

  @ManyToMany(() => Team, (team) => team.members, { lazy: true, cascade: true })
  @Field(() => [Team])
  @JoinTable()
  teams: Promise<Team[]>;
}
