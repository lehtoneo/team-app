import { Resolver, FieldResolver, Root, ID, Field, Int } from 'type-graphql';
import { In, LessThan } from 'typeorm';
import AppDataSource from '../data-source';
import {
  TeamMemberAttendanceRate,
  TeamStatistics
} from '../extra-graphql-types/TeamStatistics';
import { Event } from '../models/Event';
import { TeamMembership } from '../models/TeamMembership';
import { UserEventAttendance } from '../models/UserEventAttendance';

const teamMemberShipRepository = AppDataSource.getRepository(TeamMembership);
const userAttendanceRepository =
  AppDataSource.getRepository(UserEventAttendance);
const eventRepository = AppDataSource.getRepository(Event);

@Resolver(() => TeamStatistics)
export default class TeamStatisticsResolver {
  @FieldResolver(() => Int)
  async totalPastEvents(@Root() teamStatistics: TeamStatistics) {
    const { teamId } = teamStatistics;
    const pastEventsCount = await eventRepository.countBy({
      teamId,
      end: LessThan(new Date())
    });

    return pastEventsCount;
  }
  @FieldResolver(() => [TeamMemberAttendanceRate])
  async memberAttendanceRates(
    @Root() teamStatistics: TeamStatistics
  ): Promise<TeamMemberAttendanceRate[]> {
    const { teamId } = teamStatistics;

    const ratesMapByUserId: { [key in number]: TeamMemberAttendanceRate } = {};
    const teamMembers = await teamMemberShipRepository.find({
      where: {
        teamId
      },
      relations: ['user']
    });
    const teamMembersIDs = teamMembers.map((member) => member.userId);
    teamMembers.forEach((member) => {
      ratesMapByUserId[member.userId] = {
        user: member.user,
        pastEventsAttendanceCount: 0
      };
    });

    const teamPastEvents = await eventRepository.findBy({
      teamId,
      end: LessThan(new Date())
    });
    const teamPastEventsIDs = teamPastEvents.map((e) => e.id);
    const memberAttendances = await userAttendanceRepository.findBy({
      eventId: In(teamPastEventsIDs),
      userId: In(teamMembersIDs)
    });

    memberAttendances.forEach((attendance) => {
      if (attendance.attendance === true) {
        const newCount =
          ratesMapByUserId[attendance.userId].pastEventsAttendanceCount + 1;
        ratesMapByUserId[attendance.userId] = {
          ...ratesMapByUserId[attendance.userId],
          pastEventsAttendanceCount: newCount
        };
      }
    });

    const finalResult = Object.values(ratesMapByUserId);

    return finalResult;
  }
}
