import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
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
