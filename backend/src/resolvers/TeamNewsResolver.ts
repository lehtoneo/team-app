import { UserInputError } from 'apollo-server-express';
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { EntityNotFoundError } from 'typeorm';
import { GetByIdArgs } from '../args/GetByIdArgs';
import AppDataSource from '../data-source';
import { CreateOrUpdateTeamNewsInput } from '../inputs/team/CreateOrUpdateTeamNewsInput';
import { FilterTeamNewsInput } from '../inputs/team/FilterTeamNewsInput';
import { isAuth } from '../middleware/isAuth';
import { TeamMemberRole } from '../models/TeamMembership';
import { TeamNews } from '../models/TeamNews';
import { ConnectionType, EdgeType, PaginationInput } from '../relaySpec';
import authService from '../services/auth';
import { fetchPageWithCreatedAtCursor } from '../services/pagination';
import teamAuthService from '../services/teamAuth';
import { MyAuthContext } from '../types/MyContext';

@ObjectType()
export class TeamNewsEdge extends EdgeType('teamNews', TeamNews) {}

@ObjectType()
export class TeamNewsConnection extends ConnectionType<TeamNewsEdge>(
  'teamNews',
  TeamNewsEdge
) {}

const teamNewsRepository = AppDataSource.getRepository(TeamNews);

@Resolver(() => TeamNews)
export class TeamNewsResolver {
  @Query(() => TeamNewsConnection, { nullable: true })
  @UseMiddleware(isAuth)
  async newsConnection(
    @Ctx() ctx: MyAuthContext,
    @Args() paginationArgs: PaginationInput,
    @Args() filterTeamsArgs: FilterTeamNewsInput
  ): Promise<TeamNewsConnection> {
    await teamAuthService.checkUserTeamRightsThrowsError(
      ctx.payload.user.id,
      filterTeamsArgs.teamId,
      TeamMemberRole.MEMBER
    );
    const where = {
      teamId: filterTeamsArgs.teamId
    };
    const newsConnection = await fetchPageWithCreatedAtCursor(
      paginationArgs,
      where,
      teamNewsRepository
    );
    return newsConnection;
  }

  @Query(() => TeamNews, { nullable: true })
  @UseMiddleware(isAuth)
  async oneTeamNews(
    @Ctx() ctx: MyAuthContext,
    @Args() getByidArgs: GetByIdArgs
  ): Promise<TeamNews | null> {
    const teamNews = await teamNewsRepository.findOneBy({ id: getByidArgs.id });
    if (!teamNews) {
      return null;
    }
    await teamAuthService.checkUserTeamRightsThrowsError(
      ctx.payload.user.id,
      teamNews.teamId,
      TeamMemberRole.MEMBER
    );

    console.log({ teamNews });

    return teamNews;
  }

  @Mutation(() => TeamNews, { nullable: true })
  @UseMiddleware(isAuth)
  async createOrUpdateTeamNews(
    @Ctx() ctx: MyAuthContext,
    @Arg('createOrUpdateTeamNewsInput') input: CreateOrUpdateTeamNewsInput
  ): Promise<TeamNews> {
    const inputId = input.id;
    const inputTeamId = input.teamId;
    const minRights = TeamMemberRole.ADMIN;
    // create new if not id but teamId is provided
    if (!inputId) {
      if (!inputTeamId) {
        throw new UserInputError('Either ID or teamId is required as input');
      }
      await teamAuthService.checkUserTeamRightsThrowsError(
        ctx.payload.user,
        inputTeamId,
        minRights
      );

      const newTeamNews = await teamNewsRepository.create({
        ...input,
        teamId: inputTeamId
      });
      console.log({ newTeamNews });
      return await newTeamNews.save();
    }
    // update existing if rights and exists
    const existing = await teamNewsRepository.findOneBy({ id: inputId });

    if (!existing) {
      throw new Error(`Cannot find teamNews with id ${inputId}`);
    }
    // check user has rights to do this
    await teamAuthService.checkUserTeamRightsThrowsError(
      ctx.payload.user,
      existing.teamId,
      minRights
    );
    console.log({ inputTeamId });
    console.log(existing.teamId);
    // throw error if trying to change team id
    if (inputTeamId && inputTeamId !== existing.teamId) {
      throw new Error('Cannot change teamId of news');
    }

    const updated = await teamNewsRepository.save({ ...existing, ...input });
    // update existing

    return updated;
  }
}
