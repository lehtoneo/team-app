import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IdAndDates } from './IdAndDates';

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
