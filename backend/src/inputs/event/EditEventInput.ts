import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class EditEventInput {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ID, { nullable: true })
  typeId?: number | string;

  @Field(() => Date)
  start: Date;

  @Field(() => Date)
  end: Date;
}
