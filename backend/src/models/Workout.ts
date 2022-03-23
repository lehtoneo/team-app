import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IdAndDates } from './IdAndDates';

@Entity()
@ObjectType()
export class Workout extends IdAndDates {
  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Boolean)
  @Column({ default: false })
  done: boolean;
}
