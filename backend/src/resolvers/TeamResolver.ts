import { isAuth } from './../middleware/isAuth';
import { UserInputError } from 'apollo-server-express';
import { CreateTeamInput } from '../inputs/CreateTeamInput';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  UseMiddleware,
  Ctx
} from 'type-graphql';
import { Team } from '../models/Team';
import {
  EdgeType,
  ConnectionType,
  PaginationInput,
  PageInfo
} from '../relaySpec';
import { MoreThan, LessThan, FindOptionsWhere, ILike, In } from 'typeorm';
import { MyAuthContext, MyContext } from '../types/MyContext';
import { FilterTeamsInput } from '../inputs/FilterTeamsInput';
import AppDataSource from '../data-source';

@ObjectType()
export class TeamEdge extends EdgeType('team', Team) {}

@ObjectType()
export class TeamConnection extends ConnectionType<TeamEdge>(
  'team',
  TeamEdge
) {}

const teamRepository = AppDataSource.getRepository(Team);

@Resolver()
export class TeamResolver {
  @Query(() => [Team])
  async teams(): Promise<Team[]> {
    return await teamRepository.find();
  }

  @Query(() => TeamConnection)
  async teamConnection(
    @Ctx() ctx: MyContext,
    @Arg('paginationInput', { nullable: true }) connArgs?: PaginationInput,
    @Arg('filterTeamsInput', { nullable: true }) filterArgs?: FilterTeamsInput
  ): Promise<TeamConnection> {
    const first = connArgs?.first || 10;
    const after = connArgs?.after || new Date('1800-01-01').toISOString();

    const afterIsDate = !isNaN(Date.parse(after));
    if (!afterIsDate) {
      throw new UserInputError('Arg after should be a date string');
    }
    const where: FindOptionsWhere<Team> = {
      createdAt: MoreThan(new Date(after))
    };
    // eslint-disable-next-line no-empty
    if (filterArgs?.name) {
      where.name = ILike(`${filterArgs.name}%`);
    }
    if (filterArgs?.ownTeamsOnly && ctx.payload.user) {
      where.members = {
        id: ctx.payload.user.id
      };
    }
    const teamDBResult = await teamRepository.find({
      where,
      order: {
        updatedAt: 'ASC'
      },
      take: first + 1
    });

    const edges = teamDBResult
      .map((team) => {
        return {
          node: team,
          cursor: team.createdAt.toISOString()
        };
      })
      .slice(0, first);

    const endCursor =
      teamDBResult.length > 0
        ? teamDBResult[teamDBResult.length - 1].createdAt.toISOString()
        : null;

    const startCursor =
      teamDBResult.length > 0 ? teamDBResult[0].createdAt.toISOString() : null;

    const getHasPreviousPage = async () => {
      if (!startCursor) {
        return false;
      }

      const previousInDb = await Team.findOne({
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
      hasNextPage: teamDBResult.length > first,
      endCursor,
      startCursor,
      hasPreviousPage: await getHasPreviousPage()
    };

    return {
      edges,
      pageInfo
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Team)
  async createTeam(
    @Arg('teamInput') data: CreateTeamInput,
    @Ctx() ctx: MyAuthContext
  ) {
    const team = Team.create(data);
    const newTeam = await team.save();

    newTeam.members = [ctx.payload.user];
    const updated = await newTeam.save();
    return updated;
  }
}
