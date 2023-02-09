import { ArgsType, Int, Field } from 'type-graphql';

@ArgsType()
export class GetByIdArgs {
  @Field(() => Int, { nullable: false })
  id: number;
}
