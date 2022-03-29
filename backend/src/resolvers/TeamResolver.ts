import { UserInputError } from 'apollo-server-express';
import { CreateTeamInput } from '../inputs/CreateTeamInput';
import { Resolver, Query, Mutation, Arg, ObjectType } from 'type-graphql';
import { Team } from '../models/Team';
import {
  EdgeType,
  ConnectionType,
  PaginationInput,
  PageInfo
} from '../relaySpec';
import { MoreThan, LessThan } from 'typeorm';

@ObjectType()
export class TeamEdge extends EdgeType('team', Team) {}

@ObjectType()
export class TeamConnection extends ConnectionType<TeamEdge>(
  'team',
  TeamEdge
) {}

@Resolver()
export class TeamResolver {
  @Query(() => [Team])
  async teams() {
    return await Team.find();
  }

  @Query(() => TeamConnection)
  async teamConnection(
    @Arg('paginationInput', { nullable: true }) connArgs?: PaginationInput
  ): Promise<TeamConnection> {
    const first = connArgs?.first || 10;
    const after = connArgs?.after || new Date('1800-01-01').toISOString();

    const afterIsDate = !isNaN(Date.parse(after));
    if (!afterIsDate) {
      throw new UserInputError('Arg after should be a date string');
    }
    const teamDBResult = await Team.find({
      where: {
        createdAt: MoreThan(new Date(after))
      },
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

  @Mutation(() => Team)
  async createTeam(@Arg('teamInput') data: CreateTeamInput) {
    const book = Team.create(data);
    await book.save();
    return book;
  }
}
