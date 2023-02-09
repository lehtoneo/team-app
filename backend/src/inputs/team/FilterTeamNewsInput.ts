import { Field, ArgsType, Int } from 'type-graphql';
import { PaginationInput } from '../../relaySpec';

@ArgsType()
export class FilterTeamNewsInput extends PaginationInput {
  @Field(() => Int, { nullable: false })
  teamId: number;
}
