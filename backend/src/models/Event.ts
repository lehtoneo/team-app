import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { EventType } from './EventType';
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

  @ManyToOne(() => EventType, {
    lazy: true,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @Field(() => EventType, { nullable: true })
  type?: Promise<EventType>;

  @Column({ nullable: true })
  typeId?: number;

  @Field(() => Team)
  @ManyToOne(() => Team, { lazy: true, cascade: true, onDelete: 'CASCADE' })
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
