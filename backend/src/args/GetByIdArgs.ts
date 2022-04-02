import { ArgsType, ID, Field } from 'type-graphql';

@ArgsType()
export class GetByIdArgs {
  @Field(() => ID, { nullable: false })
  id: number;
}
