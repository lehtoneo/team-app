import { User } from './../models/User';
import { FieldResolver, Query, Resolver } from 'type-graphql';
import AppDataSource from '../data-source';
import { Team } from '../models/Team';
import { AppOpenStatistics } from './../extra-graphql-types/AppOpenStatistics';
import { Event } from '../models/Event';

const teamRepository = AppDataSource.getRepository(Team);
const eventRepository = AppDataSource.getRepository(Event);
const userRepository = AppDataSource.getRepository(User);

@Resolver(() => AppOpenStatistics)
export class AppOpenStatisticsResolver {
  @Query(() => AppOpenStatistics)
  async appOpenStatistics() {
    // field resolvers handle the values
    return {};
  }

  @FieldResolver()
  async teamCount() {
    return await teamRepository.count();
  }

  @FieldResolver()
  async eventCount() {
    return await eventRepository.count();
  }

  @FieldResolver()
  async userCount() {
    return await userRepository.count();
  }
}
