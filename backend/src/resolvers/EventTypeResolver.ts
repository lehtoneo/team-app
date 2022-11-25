import { MyAuthContext } from './../types/MyContext';
import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
  Query,
  Args,
  ObjectType
} from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import { isAuth } from '../middleware/isAuth';
import { EventType } from '../models/EventType';
import { CreateOrUpdateEventTypeInput } from '../inputs/event/CreateOrUpdateEventTypeInput';
import AppDataSource from '../data-source';
import teamAuthService from '../services/teamAuth';
import { TeamMemberRole } from '../models/TeamMembership';
import { GetByIdArgs } from '../args/GetByIdArgs';
import { ConnectionType, EdgeType, PaginationInput } from '../relaySpec';
import { FindOptionsWhere } from 'typeorm';

@ObjectType()
export class EventTypeEdge extends EdgeType('eventType', EventType) {}

@ObjectType()
export class EventTypeConnection extends ConnectionType<EventTypeEdge>(
  'eventType',
  EventTypeEdge
) {}

interface FilterEventTypesInput {
  teamId: number;
}

const eventTypeRepo = AppDataSource.getRepository(EventType);
@Resolver()
export class EventTypeResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => EventType)
  async createOrUpdateEventType(
    @Arg('createOrUpdateEventTypeInput') input: CreateOrUpdateEventTypeInput,
    @Ctx() ctx: MyAuthContext
  ): Promise<EventType> {
    await teamAuthService.checkUserTeamRightsThrowsError(
      ctx.payload.user,
      input.teamId,
      TeamMemberRole.ADMIN
    );

    // if existing, check that user has permissions to edit, if not throw unauth
    if (input.id) {
      const existing = await eventTypeRepo.findOneBy({ id: input.id });

      if (existing && existing.teamId) {
        await teamAuthService.checkUserTeamRightsThrowsError(
          ctx.payload.user,
          existing.teamId,
          TeamMemberRole.ADMIN
        );
        // edit accordingly
        existing.color = input.color;
        existing.teamId = input.teamId;
        existing.name = input.name;

        const savedType = await eventTypeRepo.save(existing);

        return savedType;
      } else {
        // throw unauth if eventType not found, user does not need to know if there is no event with the given id
        teamAuthService.throwUnAuthorized();
      }
    }

    // create new if
    const newEventType = new EventType();
    newEventType.color = input.color;
    newEventType.teamId = input.teamId;
    newEventType.name = input.name;

    const savedType = await eventTypeRepo.save(newEventType);

    return savedType;
  }

  @UseMiddleware(isAuth)
  @Query(() => EventType)
  async eventTypeConnection(
    @Ctx() ctx: MyAuthContext,
    @Arg('paginationInput', { nullable: true }) connArgs?: PaginationInput,
    @Arg('filterEventTypes', { nullable: true })
    filterArgs?: FilterEventTypesInput
  ): Promise<EventTypeConnection> {
    const first = connArgs?.first || 100;
    const where: FindOptionsWhere<EventType> = {};
    if (filterArgs?.teamId) {
      where.teamId = filterArgs.teamId;
    }
    const eventTypesDBResult = await eventTypeRepo.find({
      where,
      order: { name: 'DESC' },
      take: first + 1
    });

    if (!eventTypesDBResult) {
      throw new ApolloError('Not found');
    }

    const edges: EventTypeEdge[] = eventTypesDBResult
      .map((et) => {
        return {
          cursor: et.id.toString(),
          node: et
        };
      })
      .slice(0, first);

    const startCursor = edges.length > 0 ? edges[0].cursor : null;

    const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
    const pageInfo: PageInfo = {
      hasNextPage: eventTypesDBResult.length > first,
      endCursor,
      startCursor,
      hasPreviousPage: await getHasPreviousPage()
    };
    return eventTypesDBResult;
  }

  @UseMiddleware(isAuth)
  @Query(() => EventType)
  async oneEventType(
    @Args() args: GetByIdArgs,
    @Ctx() ctx: MyAuthContext
  ): Promise<EventType> {
    const eventType = await eventTypeRepo.findOneBy({ id: args.id });

    if (!eventType) {
      throw new ApolloError('Not found');
    }
    // check user is part of team
    if (eventType.teamId) {
      await teamAuthService.checkUserTeamRightsThrowsError(
        ctx.payload.user,
        eventType.teamId,
        TeamMemberRole.MEMBER
      );
    }

    return eventType;
  }
}
