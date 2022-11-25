import { TeamSettings } from './TeamSettings';
import { TeamMembership } from './TeamMembership';
import {
  Entity,
  Column,
  OneToMany,
  Generated,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { IdAndDates } from './IdAndDates';
import { Event } from './Event';
import { Team } from './Team';

@Entity()
@ObjectType()
export class EventType extends IdAndDates {
  @Field(() => String)
  @Column({ nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  teamId?: number;
  @ManyToOne(() => Team, {
    lazy: true,
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true
  })
  team?: Promise<Team>;
}
