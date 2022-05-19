import { TeamMemberRole } from '../../models/TeamMembership';
import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class DeleteTeamMembershipInput {
  @Field(() => ID, { nullable: false })
  userId: number;

  @Field(() => ID, { nullable: false })
  teamId: number;
}

@InputType()
export class EditTeamMembershipInput extends DeleteTeamMembershipInput {
  @Field(() => TeamMemberRole, { nullable: true })
  role?: TeamMemberRole;
}
