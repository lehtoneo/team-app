import { UserInputError } from 'apollo-server-express';
import { isAuth } from './../middleware/isAuth';
import { EditTeamMembershipInput } from '../inputs/team/EditTeamMembershipInput';
import { Between, In } from 'typeorm';
import { TeamMemberStatistics } from '../extra-graphql-types/TeamMemberStatistics';
import { TeamMembership, TeamMemberRole } from './../models/TeamMembership';
import {
  Resolver,
  FieldResolver,
  Root,
  ID,
  Mutation,
  UseMiddleware,
  Ctx,
  Arg
} from 'type-graphql';

import { UserEventAttendance } from '../models/UserEventAttendance';
import AppDataSource from '../data-source';
import { Event } from '../models/Event';
import { MyAuthContext } from '../types/MyContext';
import teamAuthService from '../services/teamAuth';

const userAttendanceRepository =
  AppDataSource.getRepository(UserEventAttendance);
const eventRepository = AppDataSource.getRepository(Event);
const teamMembershipRepository = AppDataSource.getRepository(TeamMembership);

@Resolver(() => TeamMembership)
export default class TeamMembershipResolver {
  @FieldResolver(() => ID)
  async id(@Root() teamMembership: TeamMembership) {
    const teamId = teamMembership.teamId;
    const userId = teamMembership.userId;

    return `${teamId}-${userId}`;
  }

  @FieldResolver(() => TeamMemberStatistics)
  async statistics(
    @Root() membership: TeamMembership
  ): Promise<TeamMemberStatistics> {
    const teamId = membership.teamId;
    const userId = membership.userId;
    const teamPastEventsAfterUserJoin = await eventRepository.findBy({
      teamId,
      end: Between(new Date(membership.createdAt), new Date())
    });

    const teamPastEventsIds = teamPastEventsAfterUserJoin.map((e) => e.id);

    const memberAttendanceCount = await userAttendanceRepository.countBy({
      eventId: In(teamPastEventsIds),
      userId,
      attendance: true
    });
    const attendanceRatioDivider =
      teamPastEventsAfterUserJoin.length === 0
        ? 1
        : teamPastEventsAfterUserJoin.length;
    const result = {
      membership,
      pastEventsAttendanceCount: memberAttendanceCount,
      pastEventsAttendanceRatio: memberAttendanceCount / attendanceRatioDivider
    };

    return result;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => TeamMembership)
  async editTeamMembership(
    @Ctx() ctx: MyAuthContext,
    @Arg('editTeamMembershipInput') args: EditTeamMembershipInput
  ): Promise<TeamMembership> {
    const currentUser = ctx.payload.user;
    const { teamId, role } = args;

    await teamAuthService.checkUserTeamRightsThrowsError(
      currentUser,
      teamId,
      TeamMemberRole.OWNER
    );

    const editedMembership = await teamMembershipRepository.findOneByOrFail({
      teamId: args.teamId,
      userId: args.userId
    });
    if (editedMembership.role === 'OWNER' && role && role !== 'OWNER') {
      throw new UserInputError('Cannot edit owners role');
    }
    editedMembership.role = role ? role : editedMembership.role;

    await teamMembershipRepository.save(editedMembership);

    return editedMembership;
  }
}
