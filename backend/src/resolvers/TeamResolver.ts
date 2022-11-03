import { TeamMembership, TeamMemberRole } from './../models/TeamMembership';
import { isAuth } from './../middleware/isAuth';
import { UserInputError } from 'apollo-server-express';
import { CreateTeamInput } from '../inputs/team/CreateTeamInput';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  UseMiddleware,
  Ctx,
  FieldResolver,
  Root,
  Int,
  Args,
  ID
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
import { FilterTeamsInput } from '../inputs/team/FilterTeamsInput';
import AppDataSource from '../data-source';
import { JoinTeamInput } from '../inputs/team/JoinTeamInput';
import { GetOneTeamInput } from '../inputs/team/GetOneTeamInput';
import { TeamSettings } from '../models/TeamSettings';
import teamAuthService from '../services/teamAuth';
import { EditTeamInput } from '../inputs/team/EditTeamInput';
import { Event } from '../models/Event';
import { GetByIdArgs } from '../args/GetByIdArgs';
import * as uuid from 'uuid';

@ObjectType()
export class TeamEdge extends EdgeType('team', Team) {}

@ObjectType()
export class TeamConnection extends ConnectionType<TeamEdge>(
  'team',
  TeamEdge
) {}

const teamRepository = AppDataSource.getRepository(Team);
const teamMembershipRepository = AppDataSource.getRepository(TeamMembership);
const teamSettingsRepository = AppDataSource.getRepository(TeamSettings);
const eventRepository = AppDataSource.getRepository(Event);
@Resolver(() => Team)
export class TeamResolver {
  @FieldResolver(() => Int, { nullable: false })
  async pastEventsCount(@Root() team: Team): Promise<number> {
    const { id } = team;
    const pastEventsCount = await eventRepository.countBy({
      teamId: id,
      end: LessThan(new Date())
    });
    return pastEventsCount;
  }

  @FieldResolver(() => TeamMembership, { nullable: false })
  async memberships(@Root() team: Team) {
    const { id } = team;
    const memberships = await teamMembershipRepository.findBy({
      teamId: id
    });
    return memberships;
  }

  @FieldResolver(() => TeamSettings, { nullable: true })
  async settings(
    @Root() team: Team,
    @Ctx() ctx: MyContext
  ): Promise<TeamSettings | null> {
    if (!ctx.payload.user) {
      return null;
    }

    const userTeamMembership = await teamMembershipRepository.findOneBy({
      userId: ctx.payload.user.id,
      teamId: team.id
    });

    if (
      userTeamMembership &&
      teamAuthService.isUserTeamRoleAtleast(
        userTeamMembership.role,
        TeamMemberRole.ADMIN
      )
    ) {
      const res = await teamSettingsRepository.findOneBy({
        id: (await team.settings).id
      });
      return res;
    } else {
      return null;
    }
  }
  @FieldResolver(() => String, { nullable: true })
  async joinId(
    @Root() team: Team,
    @Ctx() ctx: MyContext
  ): Promise<string | null> {
    if (!ctx.payload.user) {
      return null;
    }

    try {
      await teamAuthService.checkUserTeamRightsThrowsError(
        ctx.payload.user,
        team.id,
        TeamMemberRole.ADMIN
      );
      return team.joinId;
    } catch (e) {
      return null;
    }
  }
  @FieldResolver(() => TeamMembership, { nullable: true })
  async currentUserTeamMembership(
    @Root() team: Team,
    @Ctx() ctx: MyContext
  ): Promise<TeamMembership | null> {
    console.log('laalaa');
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
      throw new UserInputError('QUERY NEEDS EITHER JOINID OR USERID');
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Team)
  async editTeam(
    @Ctx() ctx: MyAuthContext,

    @Arg('editTeamInput', { nullable: false })
    editTeamInput: EditTeamInput
  ): Promise<Team> {
    const teamId = editTeamInput.id;
    await teamAuthService.checkUserTeamRightsThrowsError(
      ctx.payload.user.id,
      teamId,
      TeamMemberRole.OWNER
    );
    const team = await teamRepository.findOneByOrFail({ id: teamId });
    if (editTeamInput.settings) {
      const settingsInput = editTeamInput.settings;
      const settings = await teamSettingsRepository.findOneByOrFail({
        id: team.settingsId
      });

      settings.discordNotificationsOn = settingsInput.discordNotificationsOn;
      settings.discordWebhookUrl = settingsInput.discordWebhookUrl;
      settings.trollMessages = settingsInput.trollMessages;
      await teamSettingsRepository.save(settings);
    }

    if (editTeamInput.baseInfo) {
      const baseInfoInput = editTeamInput.baseInfo;
      team.name = baseInfoInput.name;
      team.description = baseInfoInput.description;
    }
    if (editTeamInput.regenerateJoinId) {
      team.joinId = uuid.v4();
    }
    await teamRepository.save(team);
    return team;
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

    const newSettings = new TeamSettings();
    const savedSettings = await teamSettingsRepository.save(newSettings);
    team.settingsId = savedSettings.id;
    const newTeam = await team.save();

    const newMembership = new TeamMembership();
    newMembership.userId = ctx.payload.user.id;
    newMembership.teamId = newTeam.id;
    newMembership.role = TeamMemberRole.OWNER;

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
    newMembership.role = TeamMemberRole.MEMBER;

    await teamMembershipRepository.save(newMembership);
    return team;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => ID)
  async deleteTeam(
    @Args() { id }: GetByIdArgs,
    @Ctx() ctx: MyAuthContext
  ): Promise<number> {
    const team = await teamRepository.findOneBy({
      id
    });

    if (!team) {
      throw new UserInputError('Team not found');
    }

    await teamAuthService.checkUserTeamRightsThrowsError(
      ctx.payload.user,
      team,
      TeamMemberRole.OWNER
    );

    await teamRepository.delete({
      id
    });

    return id;
  }
}
