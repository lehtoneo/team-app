import { InputType, Field, ArgsType, ID } from 'type-graphql';
import { PaginationInput } from '../../relaySpec';

@ArgsType()
export class FilterTeamNewsInput extends PaginationInput {
  @Field(() => ID, { nullable: false })
  teamId: number;
}
