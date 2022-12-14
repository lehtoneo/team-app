import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IdAndDates } from './IdAndDates';
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
  @Field({ nullable: false })
  teamId: number;
  @ManyToOne(() => Team, {
    lazy: true,
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true
  })
  team: Promise<Team>;
}
