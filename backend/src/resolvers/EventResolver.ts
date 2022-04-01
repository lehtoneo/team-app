import { FilterEventsInput } from '../inputs/FilterEventsInput';
import { MyAuthContext } from './../types/MyContext';
import { isAuth } from './../middleware/isAuth';
import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
  ObjectType,
  Query
} from 'type-graphql';
import { Team } from '../models/Team';
import AppDataSource from '../data-source';
import { Event } from '../models/Event';
import { CreateTeamEventInput } from '../inputs/CreateTeamEventInput';
import {
  ConnectionType,
  EdgeType,
  PageInfo,
  PaginationInput
} from '../relaySpec';

import { UserInputError } from 'apollo-server-express';
import { FindOptionsWhere, In, LessThan } from 'typeorm';

const teamRepository = AppDataSource.getRepository(Team);
const eventRepository = AppDataSource.getRepository(Event);

@ObjectType()
export class EventEdge extends EdgeType('event', Event) {}

@ObjectType()
export class EventConnection extends ConnectionType<EventEdge>(
  'event',
  EventEdge
) {}

@Resolver(() => Event)
export class EventResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Event)
  async createTeamEvent(
    @Arg('createTeamEventInput') data: CreateTeamEventInput,
    @Ctx() _ctx: MyAuthContext
  ) {
    const newEvent = new Event();
    newEvent.name = data.name;
    newEvent.description = data.description;
    newEvent.end = data.end;
    newEvent.start = data.start;
    newEvent.teamId = data.teamId;

    const team = await teamRepository.findOne({
      where: {
        id: data.teamId
      }
    });

    if (!team) {
      throw Error('Team not found');
    }

    const savedEvent = await eventRepository.save(newEvent);

    return savedEvent;
  }

  @UseMiddleware(isAuth)
  @Query(() => EventConnection)
  async eventConnection(
    @Ctx() ctx: MyAuthContext,
    @Arg('paginationInput', { nullable: true }) connArgs?: PaginationInput,
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Arg('filterEventsInput', { nullable: true }) _?: FilterEventsInput
  ): Promise<EventConnection> {
    const first = connArgs?.first || 10;
    const after = connArgs?.after || new Date('1800-01-01').toISOString();
    const userTeams = await ctx.payload.user.teams;

    const afterIsDate = !isNaN(Date.parse(after));
    if (!afterIsDate) {
      throw new UserInputError('Arg after should be a date string');
    }
    const where: FindOptionsWhere<Event> = {
      teamId: In(userTeams.map((team) => team.id))
    };

    const eventDbResult = await eventRepository.find({
      where,
      order: {
        start: 'ASC'
      },
      take: first + 1
    });

    console.log({ eventDbResult });

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
