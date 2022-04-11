import { TeamMemberRole } from '../models/TeamMembership';
import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class EditTeamMembershipInput {
  @Field(() => ID, { nullable: false })
  userId: number;

  @Field(() => ID, { nullable: false })
  teamId: number;

  @Field(() => TeamMemberRole, { nullable: true })
  role?: TeamMemberRole;
}
