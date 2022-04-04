import { MyAuthContext } from './../types/MyContext';
import { isAuth } from './../middleware/isAuth';
import {
  Resolver,
  FieldResolver,
  Root,
  ID,
  Query,
  Arg,
  UseMiddleware,
  Ctx,
  Mutation
} from 'type-graphql';
import { SaveAttendanceInput } from '../inputs/SaveAttendanceInput';
import { UserEventAttendance } from '../models/UserEventAttendance';
import AppDataSource from '../data-source';
import { Team } from '../models/Team';
import { Event } from '../models/Event';
import discordService from '../services/discord';

const eventAttendanceRepository =
  AppDataSource.getRepository(UserEventAttendance);

const teamRepository = AppDataSource.getRepository(Team);
const eventRepository = AppDataSource.getRepository(Event);

@Resolver(() => UserEventAttendance)
export default class UserEventAttendanceResolver {
  @FieldResolver(() => ID)
  async id(@Root() userEventAttendance: UserEventAttendance) {
    const eventId = userEventAttendance.eventId;
    const userId = userEventAttendance.userId;

    return `${eventId}-${userId}`;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UserEventAttendance)
  async saveAttendance(
    @Ctx() ctx: MyAuthContext,
    @Arg('saveAttendanceInput', { nullable: false }) args: SaveAttendanceInput
  ): Promise<UserEventAttendance> {
    const userId = ctx.payload.user.id;
    const existing = await eventAttendanceRepository.findOneBy({
      eventId: args.eventId,
      userId
    });

    const obj = existing || new UserEventAttendance();

    if (!existing) {
      obj.userId = userId;
      obj.eventId = args.eventId;
    }
    obj.attendance = args.attendance;
    obj.reason = args.reason || obj.reason;
    const savedAttendance = await eventAttendanceRepository.save(obj);

    try {
      const event = await eventRepository.findOneByOrFail({ id: args.eventId });
      const team = await teamRepository.findOneByOrFail({ id: event.teamId });
      const teamSettings = await team.settings;
      if (
        teamSettings.discordWebhookUrl &&
        teamSettings.discordNotificationsOn
      ) {
        await discordService.trySendEventAttendanceChanged(
          teamSettings.discordWebhookUrl,
          ctx,
          savedAttendance,
          event
        );
      }
    } catch (e) {}
    return savedAttendance;
  }
}
