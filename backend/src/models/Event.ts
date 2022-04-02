import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { IdAndDates } from './IdAndDates';
import { Team } from './Team';

import { UserEventAttendance } from './UserEventAttendance';

@Entity()
@ObjectType()
export class Event extends IdAndDates {
  @Field(() => String)
  @Column({ nullable: false })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

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

  @Field(() => Team)
  @ManyToOne(() => Team, { lazy: true, cascade: true })
  @JoinColumn({
    name: 'teamId',
    referencedColumnName: 'id'
  })
  team: Promise<Team>;

  @Field(() => UserEventAttendance, { nullable: true })
  currentUserEventAttendance?: UserEventAttendance;

  @Column({ nullable: false })
  teamId: number;
}
