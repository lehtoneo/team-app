import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IdAndDates } from './IdAndDates';
import { Team } from './Team';

@Entity()
@ObjectType()
export class TeamNews extends IdAndDates {
  @Field(() => String)
  @Column({ nullable: false })
  title: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  teamId: number;
}
