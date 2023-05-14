import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IdAndDates } from './IdAndDates';
import { Event } from './Event';

@Entity()
@ObjectType()
export class WorkoutExerciseSet extends IdAndDates {
  @Field(() => Number)
  @Column({ nullable: false })
  weight: number;

  @Field(() => Number)
  @Column({ nullable: false })
  reps: number;

  @Field(() => Number)
  @Column({ nullable: false })
  workoutExerciseId: number;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.sets,
    {}
  )
  workoutExercise: Promise<WorkoutExercise>;
}

@Entity()
@ObjectType()
export class ExerciseTarget extends IdAndDates {
  @Column({ nullable: false, unique: true })
  @Field(() => String)
  name: string;
}

@Entity()
@ObjectType()
export class Exercise extends IdAndDates {
  @Field(() => String)
  @Column({ nullable: false, unique: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => ExerciseTarget, { lazy: true })
  @JoinTable()
  targets: Promise<ExerciseTarget[]>;
}

@Entity()
@ObjectType()
export class WorkoutExercise extends IdAndDates {
  @Field(() => [WorkoutExerciseSet])
  @ManyToOne(
    () => WorkoutExerciseSet,
    (workoutExerciseSet) => workoutExerciseSet.workoutExercise,
    { nullable: true }
  )
  sets?: WorkoutExerciseSet[];

  @Field(() => Number)
  @Column({ nullable: false })
  exerciseId: number;

  @ManyToOne(() => Exercise, {
    lazy: true,
    cascade: true
  })
  exercise: Promise<Exercise>;

  @Field(() => Number)
  @Column({ nullable: false })
  workoutId: number;

  @OneToMany(() => Workout, (workout) => workout.strengthExercises, {})
  workout: Promise<Workout>;
}

@Entity()
@ObjectType()
export class Workout extends IdAndDates {
  @Field(() => String)
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  type: 'strength' | 'cardio' | 'other';

  @Column({ nullable: true })
  @Field({ nullable: true })
  cardioLength?: number;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.workout,
    {}
  )
  strengthExercises: WorkoutExercise[];

  @Column({ nullable: true })
  @Field({ nullable: false })
  eventId: number;

  @ManyToOne(() => Event, {
    lazy: true,
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true
  })
  event: Promise<Event>;
}
