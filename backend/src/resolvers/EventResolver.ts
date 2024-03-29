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
import { FindOptionsOrder, FindOptionsWhere, In } from 'typeorm';
import { UserEventAttendance } from '../models/UserEventAttendance';
import { EditEventInput } from '../inputs/event/EditEventInput';
import teamAuthService from '../services/teamAuth';
import { TeamMemberRole } from '../models/TeamMembership';
import dbUtils from '../util/db';
import { EventType } from '../models/EventType';

const teamRepository = AppDataSource.getRepository(Team);
const eventRepository = AppDataSource.getRepository(Event);
const eventTypeRepository = AppDataSource.getRepository(EventType);
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
  @FieldResolver(() => EventType)
  async type(
    @Root() event: Event,
    @Ctx() ctx: MyContext
  ): Promise<EventType | null> {
    if (!ctx.payload.user) {
      return null;
    }
    const id = event.typeId;
    if (id === null) {
      return null;
    }
    const type = await eventTypeRepository.findOneBy({ id: id });
    return type;
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
    newEvent.typeId = data.typeId;

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

    if (data.name) {
      event.name = data.name;
    }
    if (data.description) {
      event.description = data.description;
    }

    event.typeId = data.typeId === undefined ? undefined : Number(data.typeId);

    if (data.typeId === null) {
      event.typeId = null;
      event.type = null;
    }
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
      teamId:
        filterArgs?.teamId ||
        In(userTeamMemberships.map((teamMembership) => teamMembership.teamId))
    };

    if (connArgs?.after) {
      // add 1 millisecond to after to exlude first
      const afterDate = new Date(connArgs.after);
      where.start = dbUtils.getWhereOperatorFromFilterDateInput(
        {
          min: afterDate,
          max: filterArgs?.start?.max
        },
        { excludeMin: true }
      );
    } else if (connArgs?.before) {
      const beforeDate = new Date(connArgs.before);
      where.start = dbUtils.getWhereOperatorFromFilterDateInput({
        min: filterArgs?.start?.min || new Date('1800-01-01'),
        max: beforeDate
      });
    } else {
      where.start = dbUtils.getWhereOperatorFromFilterDateInput(
        filterArgs?.start
      );
    }

    where.end = dbUtils.getWhereOperatorFromFilterDateInput(filterArgs?.end);
    const order: FindOptionsOrder<Event> = {
      start: connArgs?.before ? 'DESC' : 'ASC'
    };
    let eventDbResult = await eventRepository.find({
      where,
      order,
      take: first + 1
    });

    if (connArgs?.before) {
      eventDbResult = eventDbResult.reverse();
    }

    const edges = eventDbResult
      .map((event) => {
        return {
          node: event,
          cursor: event.start.toISOString()
        };
      })
      .slice(0, first);

    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
    const startCursor = edges.length > 0 ? edges[0].cursor : null;

    const getHasPreviousPage = async () => {
      if (!startCursor) {
        return false;
      }
      const minStart = filterArgs?.start?.min
        ? new Date(filterArgs.start.min)
        : undefined;
      const startParams = dbUtils.getWhereOperatorFromFilterDateInput(
        {
          min: minStart,
          max: new Date(startCursor)
        },
        { excludeMax: true }
      );
      const previousInDb = await eventRepository.findOne({
        order,
        where: {
          ...where,
          start: startParams
        }
      });

      return previousInDb !== null;
    };
    const hasPreviousPage = await getHasPreviousPage();

    const pageInfo: PageInfo = {
      hasNextPage: eventDbResult.length > first,
      endCursor,
      startCursor,
      hasPreviousPage: hasPreviousPage
    };

    return {
      edges,
      pageInfo
    };
  }
}
