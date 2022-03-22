import { UserInputError } from 'apollo-server-express';
import { CreateWorkoutInput } from '../inputs/CreateWorkoutInput';
import { Resolver, Query, Mutation, Arg, ObjectType, Args } from 'type-graphql';
import { Workout } from '../models/Workout';
import {
  EdgeType,
  ConnectionType,
  PaginationInput,
  PageInfo
} from '../relaySpec';
import { Raw, MoreThan, LessThan } from 'typeorm';

@ObjectType()
export class WorkoutEdge extends EdgeType('workout', Workout) {}

@ObjectType()
export class WorkoutConnection extends ConnectionType<WorkoutEdge>(
  'workout',
  WorkoutEdge
) {}

@Resolver()
export class WorkoutResolver {
  @Query(() => [Workout])
  async workouts() {
    return await Workout.find();
  }

  @Query(() => WorkoutConnection)
  async workoutConnection(
    @Arg('paginationInput', { nullable: true }) connArgs?: PaginationInput
  ): Promise<WorkoutConnection> {
    const first = connArgs?.first || 10;
    const after = connArgs?.after || new Date('1800-01-01').toISOString();

    const afterIsDate = !isNaN(Date.parse(after));
    if (!afterIsDate) {
      throw new UserInputError('Arg after should be a date string');
    }
    const workoutDBResult = await Workout.find({
      where: {
        created_at: MoreThan(new Date(after))
      },
      order: {
        updated_at: 'ASC'
      },
      take: first + 1
    });

    const edges = workoutDBResult
      .map((workout) => {
        return {
          node: workout,
          cursor: workout.created_at.toISOString()
        };
      })
      .slice(0, first);

    const endCursor =
      workoutDBResult.length > 0
        ? workoutDBResult[workoutDBResult.length - 1].created_at.toISOString()
        : null;

    const startCursor =
      workoutDBResult.length > 0
        ? workoutDBResult[0].created_at.toISOString()
        : null;

    const getHasPreviousPage = async () => {
      if (!startCursor) {
        return false;
      }

      const previousInDb = await Workout.findOne({
        where: {
          created_at: LessThan(new Date(startCursor))
        },
        order: {
          updated_at: 'DESC'
        }
      });

      return previousInDb !== undefined;
    };
    const pageInfo: PageInfo = {
      hasNextPage: workoutDBResult.length > first,
      endCursor,
      startCursor,
      hasPreviousPage: await getHasPreviousPage()
    };

    return {
      edges,
      pageInfo
    };
  }

  @Mutation(() => Workout)
  async createWorkout(@Arg('workoutInput') data: CreateWorkoutInput) {
    const book = Workout.create(data);
    await book.save();
    return book;
  }
}
