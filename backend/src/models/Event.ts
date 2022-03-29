import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { IdAndDates } from './IdAndDates';
import { Team } from './Team';

import { User } from './User';
import { UserEventAttendance } from './UserEventAttendance';

@Entity()
@ObjectType()
export class Event extends IdAndDates {
  @Field(() => String)
  @Column({ nullable: false })
  name: string;

  @Field(() => String)
  @Column({ nullable: true })
  extraInfo?: string;

  @Field(() => Date)
  @Column({ nullable: false })
  start: Date;

  @Field(() => Date)
  @Column({ nullable: false })
  end: Date;

  @Field(() => [UserEventAttendance])
  @OneToMany(
    () => UserEventAttendance,
    (eventAttendance) => eventAttendance.event,
    { lazy: true }
  )
  userAttendances?: Promise<UserEventAttendance[]>;

  @ManyToOne(() => Team, (team) => team.events, { nullable: false })
  team: User;
}
