import { TeamMemberRole } from '../../models/TeamMembership';
import { InputType, Field, ID, Int } from 'type-graphql';

@InputType()
export class DeleteTeamMembershipInput {
  @Field(() => Int, { nullable: false })
  userId: number;

  @Field(() => Int, { nullable: false })
  teamId: number;
}

@InputType()
export class EditTeamMembershipInput extends DeleteTeamMembershipInput {
  @Field(() => TeamMemberRole, { nullable: true })
  role?: TeamMemberRole;
}
