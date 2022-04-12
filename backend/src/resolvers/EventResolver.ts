import { TeamDiscordService } from './../services/teamDiscordService';
import { GetByIdArgs } from './../args/GetByIdArgs';
import { FilterEventsInput } from '../inputs/event/FilterEventsInput';
import { MyAuthContext, MyContext } from './../types/MyContext';
import { isAuth } from './../middleware/isAuth';
import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
  ObjectType,
  Query,
  Args,
  FieldResolver,
  Root
} from 'type-graphql';
import { Team } from '../models/Team';
import AppDataSource from '../data-source';
import { Event } from '../models/Event';
import { CreateEventInput } from '../inputs/event/CreateEventInput';
import {
  ConnectionType,
  EdgeType,
  PageInfo,
  PaginationInput
} from '../relaySpec';

import { UserInputError } from 'apollo-server-express';
import { FindOptionsWhere, In, LessThan, MoreThan } from 'typeorm';
import { UserEventAttendance } from '../models/UserEventAttendance';
import { EditEventInput } from '../inputs/event/EditEventInput';
import teamAuthService from '../services/teamAuth';
import { TeamMemberRole } from '../models/TeamMembership';
import dbUtils from '../util/db';

const teamRepository = AppDataSource.getRepository(Team);
const eventRepository = AppDataSource.getRepository(Event);
const userEventAttendanceRepository =
  AppDataSource.getRepository(UserEventAttendance);

@ObjectType()
export class EventEdge extends EdgeType('event', Event) {}

@ObjectType()
export class EventConnection extends ConnectionType<EventEdge>(
  'event',
  EventEdge
) {}

@Resolver(() => Event)
export class EventResolver {
  @FieldResolver(() => UserEventAttendance)
  async currentUserEventAttendance(
    @Root() event: Event,
    @Ctx() ctx: MyContext
  ): Promise<UserEventAttendance | null> {
    if (!ctx.payload.user) {
      return null;
    }

    const userAttendance = await userEventAttendanceRepository.findOneBy({
      userId: ctx.payload.user.id,
      eventId: event.id
    });
    return userAttendance;
  }
  @UseMiddleware(isAuth)
  @Mutation(() => Event)
  async createEvent(
    @Arg('createEventInput') data: CreateEventInput,
    @Ctx() ctx: MyAuthContext
  ) {
    const team = await teamRepository.findOne({
      where: {
        id: data.teamId
      }
    });

    if (!team) {
      throw Error('Team not found');
    }
    await teamAuthService.checkUserTeamRightsThrowsError(
      ctx.payload.user,
      team,
      TeamMemberRole.ADMIN
    );

    const newEvent = new Event();
    newEvent.name = data.name;
    newEvent.description = data.description;
    newEvent.end = data.end;
    newEvent.start = data.start;
    newEvent.teamId = data.teamId;

    const savedEvent = await eventRepository.save(newEvent);

    try {
      const team = await teamRepository.findOneByOrFail({ id: data.teamId });
      const teamSettings = await team.settings;
      const teamDiscordService = new TeamDiscordService(teamSettings, ctx);

      await teamDiscordService.trySendEventCreated(savedEvent);
    } catch (e) {
      // do nothing
    }

    return savedEvent;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Event)
  async editEvent(
    @Arg('editEventInput') data: EditEventInput,
    @Ctx() ctx: MyAuthContext
  ) {
    const currentUser = ctx.payload.user;
    const event = await eventRepository.findOneByOrFail({ id: data.id });

    await teamAuthService.checkUserTeamRightsThrowsError(
      currentUser,
      event.teamId,
      TeamMemberRole.ADMIN
    );

    event.name = data.name;
    event.description = data.description;
    event.end = data.end;
    event.start = data.start;
    const savedEvent = await eventRepository.save(event);
    return savedEvent;
  }

  @UseMiddleware(isAuth)
  @Query(() => Event, { nullable: true })
  async oneEvent(
    @Ctx() ctx: MyAuthContext,
    @Args() { id }: GetByIdArgs
  ): Promise<Event | null> {
    const res = await eventRepository.findOneBy({ id });
    if (!res) {
      throw new UserInputError('Event not found');
    }
    await teamAuthService.checkUserTeamRightsThrowsError(
      ctx.payload.user,
      res.teamId,
      TeamMemberRole.MEMBER
    );
    return res;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Event, { nullable: true })
  async deleteEvent(
    @Ctx() ctx: MyAuthContext,
    @Args() { id }: GetByIdArgs
  ): Promise<Event | null> {
    const event = await eventRepository.findOneBy({ id });
    if (!event) {
      throw new UserInputError('Event not found');
    }
    await teamAuthService.checkUserTeamRightsThrowsError(
      ctx.payload.user,
      event.teamId,
      TeamMemberRole.OWNER
    );
    await eventRepository.delete({ id });
    return event;
  }

  @UseMiddleware(isAuth)
  @Query(() => EventConnection)
  async eventConnection(
    @Ctx() ctx: MyAuthContext,
    @Arg('paginationInput', { nullable: true }) connArgs?: PaginationInput,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Arg('filterEventsInput', { nullable: true }) filterArgs?: FilterEventsInput
  ): Promise<EventConnection> {
    const first = connArgs?.first || 10;
    const after = connArgs?.after || new Date('1800-01-01').toISOString();
    const userTeamMemberships = await ctx.payload.user.teams;

    const afterIsDate = !isNaN(Date.parse(after));
    if (!afterIsDate) {
      throw new UserInputError('Arg after should be a date string');
    }
    const where: FindOptionsWhere<Event> = {
      teamId: In(
        userTeamMemberships.map((teamMembership) => teamMembership.teamId)
      )
    };
    if (filterArgs?.start) {
      where.start = dbUtils.getWhereOperatorFromFilterDateInput(
        filterArgs.start
      );
    }

    if (filterArgs?.end) {
      where.end = dbUtils.getWhereOperatorFromFilterDateInput(filterArgs.end);
    }

    const eventDbResult = await eventRepository.find({
      where,
      order: {
        start: 'ASC'
      },
      take: first + 1
    });

    const edges = eventDbResult
      .map((event) => {
        return {
          node: event,
          cursor: event.createdAt.toISOString()
        };
      })
      .slice(0, first);

    const endCursor =
      eventDbResult.length > 0
        ? eventDbResult[eventDbResult.length - 1].createdAt.toISOString()
        : null;

    const startCursor =
      eventDbResult.length > 0
        ? eventDbResult[0].createdAt.toISOString()
        : null;

    const getHasPreviousPage = async () => {
      if (!startCursor) {
        return false;
      }

      const previousInDb = await eventRepository.findOne({
        where: {
          ...where,
          createdAt: LessThan(new Date(startCursor))
        },
        order: {
          updatedAt: 'DESC'
        }
      });

      return previousInDb !== undefined;
    };
    const pageInfo: PageInfo = {
      hasNextPage: eventDbResult.length > first,
      endCursor,
      startCursor,
      hasPreviousPage: await getHasPreviousPage()
    };

    return {
      edges,
      pageInfo
    };
  }
}
