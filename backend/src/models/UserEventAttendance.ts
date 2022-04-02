import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Dates } from './IdAndDates';
import { Event } from './Event';

import { User } from './User';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class UserEventAttendance extends Dates {
  @PrimaryColumn()
  @Field(() => ID)
  userId: number;

  @PrimaryColumn()
  @Field(() => ID)
  eventId: number;

  @ManyToOne(() => User, (user) => user.eventAttendances)
  @JoinColumn({ name: 'userId' })
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Event, (event) => event.userAttendances)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Field(() => Boolean)
  @Column()
  attendance: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  reason?: string;
}
