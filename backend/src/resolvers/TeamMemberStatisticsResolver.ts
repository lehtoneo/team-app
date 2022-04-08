import { Resolver, FieldResolver, Root, Int } from 'type-graphql';
import { In, LessThan } from 'typeorm';
import AppDataSource from '../data-source';
import { TeamMemberStatistics } from '../extra-graphql-types/TeamMemberStatistics';
import { Event } from '../models/Event';

import { UserEventAttendance } from '../models/UserEventAttendance';

const userAttendanceRepository =
  AppDataSource.getRepository(UserEventAttendance);
const eventRepository = AppDataSource.getRepository(Event);

@Resolver(() => TeamMemberStatistics)
export default class TeamMemberStatisticsResolver {
  @FieldResolver(() => Int)
  async pastEventsAttendanceCount(@Root() statistics: TeamMemberStatistics) {
    const { membership } = statistics;
    const teamId = membership.teamId;
    const userId = membership.userId;
    const teamPastEvents = await eventRepository.findBy({
      teamId,
      end: LessThan(new Date())
    });

    const teamPastEventsIds = teamPastEvents.map((e) => e.id);

    const memberAttendanceCount = await userAttendanceRepository.countBy({
      eventId: In(teamPastEventsIds),
      userId,
      attendance: true
    });

    return memberAttendanceCount;
  }
}
