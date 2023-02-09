import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class EditEventInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  typeId?: number | string;

  @Field(() => Date)
  start: Date;

  @Field(() => Date)
  end: Date;
}
