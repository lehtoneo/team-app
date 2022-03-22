import { Workout } from '../models/Workout';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateWorkoutInput implements Partial<Workout> {
  @Field()
  description: string;

  @Field({ nullable: true })
  done?: boolean;
}
