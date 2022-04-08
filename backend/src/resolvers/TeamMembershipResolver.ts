import { Between, In } from 'typeorm';
import { TeamMemberStatistics } from '../extra-graphql-types/TeamMemberStatistics';
import { TeamMembership } from './../models/TeamMembership';
import { Resolver, FieldResolver, Root, ID } from 'type-graphql';

import { UserEventAttendance } from '../models/UserEventAttendance';
import AppDataSource from '../data-source';
import { Event } from '../models/Event';

const userAttendanceRepository =
  AppDataSource.getRepository(UserEventAttendance);
const eventRepository = AppDataSource.getRepository(Event);

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
}
