import { TeamMembership } from './../models/TeamMembership';
import { GetByIdArgs } from '../args/GetByIdArgs';
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
  Ctx,
  Args,
  FieldResolver,
  Root
} from 'type-graphql';
import { Team } from '../models/Team';
import {
  EdgeType,
  ConnectionType,
  PaginationInput,
  PageInfo
} from '../relaySpec';
import { MoreThan, LessThan, FindOptionsWhere, ILike } from 'typeorm';
import { MyAuthContext, MyContext } from '../types/MyContext';
import { FilterTeamsInput } from '../inputs/FilterTeamsInput';
import AppDataSource from '../data-source';
import { JoinTeamInput } from '../inputs/JoinTeamInput';
import { GetOneTeamInput } from '../inputs/GetOneTeamInput';

@ObjectType()
export class TeamEdge extends EdgeType('team', Team) {}

@ObjectType()
export class TeamConnection extends ConnectionType<TeamEdge>(
  'team',
  TeamEdge
) {}

const teamRepository = AppDataSource.getRepository(Team);
const teamMembershipRepository = AppDataSource.getRepository(TeamMembership);

@Resolver(() => Team)
export class TeamResolver {
  @FieldResolver(() => String, { nullable: true })
  async joinId(
    @Root() team: Team,
    @Ctx() ctx: MyContext
  ): Promise<string | null> {
    if (!ctx.payload.user) {
      return null;
    }

    const userTeamMembership = await teamMembershipRepository.findOneBy({
      userId: ctx.payload.user.id,
      teamId: team.id
    });

    if (userTeamMembership && userTeamMembership.role === 'OWNER') {
      return team.joinId;
    }
    return null;
  }
  @FieldResolver(() => TeamMembership, { nullable: true })
  async currentUserTeamMembership(
    @Root() team: Team,
    @Ctx() ctx: MyContext
  ): Promise<TeamMembership | null> {
    if (!ctx.payload.user) {
      return null;
    }

    const teamMembership = await teamMembershipRepository.findOneBy({
      teamId: team.id,
      userId: ctx.payload.user.id
    });
    return teamMembership;
  }
  @Query(() => Team, { nullable: true })
  async oneTeam(
    @Arg('getOneTeamInput') args: GetOneTeamInput
  ): Promise<Team | null> {
    const { id, joinId } = args;
    if (id) {
      const res = await teamRepository.findOne({
        where: {
          id
        }
      });
      return res;
    } else if (joinId) {
      const res = await teamRepository.findOne({
        where: {
          joinId
        }
      });
      return res;
    } else {
      throw new UserInputError('QUERY NEED EITHER JOINID OR USERID');
    }
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
      where.memberships = {
        userId: ctx.payload.user.id
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
    @Arg('createTeamInput') data: CreateTeamInput,
    @Ctx() ctx: MyAuthContext
  ) {
    const team = Team.create(data);
    const newTeam = await team.save();

    const newMembership = new TeamMembership();
    newMembership.userId = ctx.payload.user.id;
    newMembership.teamId = newTeam.id;
    newMembership.role = 'OWNER';
    await teamMembershipRepository.save(newMembership);

    return newTeam;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Team)
  async joinTeam(
    @Arg('joinTeamInput') data: JoinTeamInput,
    @Ctx() ctx: MyAuthContext
  ) {
    const team = await teamRepository.findOneBy({
      joinId: data.joinId
    });

    if (!team) {
      throw new UserInputError('Team not found');
    }

    const isUserMember = await teamMembershipRepository.findOneBy({
      userId: ctx.payload.user.id,
      teamId: team.id
    });

    if (isUserMember) {
      throw new UserInputError('You are already a member of the team');
    }

    const newMembership = new TeamMembership();
    newMembership.userId = ctx.payload.user.id;
    newMembership.teamId = team.id;
    newMembership.role = 'MEMBER';
    await teamMembershipRepository.save(newMembership);

    return team;
  }
}
