import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { EventType } from './EventType';
import { IdAndDates } from './IdAndDates';
import { Team } from './Team';

import { UserEventAttendance } from './UserEventAttendance';
import { Exercise, Workout } from './ExerciseModels';

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

  @Field(() => [Workout], { nullable: true })
  @OneToMany(() => Workout, (workout) => workout.event, { lazy: true })
  workouts?: Workout;

  @Field(() => [UserEventAttendance])
  @OneToMany(
    () => UserEventAttendance,
    (eventAttendance) => eventAttendance.event,
    { lazy: true }
  )
  userAttendances?: Promise<UserEventAttendance[]>;

  @Field(() => EventType, { nullable: true })
  @ManyToOne(() => EventType, {
    lazy: true,
    onDelete: 'CASCADE'
  })
  type?: Promise<EventType> | null;

  @Column({ nullable: true })
  typeId?: number | null;

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
