import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IdAndDates } from './IdAndDates';
import { User } from './User';
import { Event } from './Event';

@Entity()
@ObjectType()
export class Team extends IdAndDates {
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => User, (user) => user.teams, { lazy: true })
  @Field(() => [User])
  members: Promise<User[]>;

  @OneToMany(() => Event, (event) => event.team, { lazy: true })
  @Field(() => [Event])
  events: Promise<Event[]>;
}
