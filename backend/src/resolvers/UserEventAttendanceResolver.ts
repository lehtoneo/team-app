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

const eventAttendanceRepository =
  AppDataSource.getRepository(UserEventAttendance);

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
    const saved = await eventAttendanceRepository.save(obj);
    return saved;
  }
}
