import { UserInputError } from 'apollo-server-express';
import { CreateTodoInput } from './../inputs/CreateTodoInput';
import { Resolver, Query, Mutation, Arg, ObjectType, Args } from 'type-graphql';
import { Todo } from '../models/Todo';
import {
  EdgeType,
  ConnectionType,
  ConnectionArgs,
  PageInfo
} from '../relaySpec';
import { Raw, MoreThan, LessThan } from 'typeorm';

@ObjectType()
export class TodoEdge extends EdgeType('todo', Todo) {}

@ObjectType()
export class TodoConnection extends ConnectionType<TodoEdge>(
  'todo',
  TodoEdge
) {}

@Resolver()
export class TodoResolver {
  @Query(() => [Todo])
  async todos() {
    return await Todo.find();
  }

  @Query(() => TodoConnection)
  async todoConnection(
    @Args() connArgs: ConnectionArgs
  ): Promise<TodoConnection> {
    const first = connArgs.first || 10;
    const after = connArgs.after || new Date('1800-01-01').toISOString();

    const afterIsDate = !isNaN(Date.parse(after));
    if (!afterIsDate) {
      throw new UserInputError(`Arg after should be a date string`);
    }
    const todoDbResult = await Todo.find({
      where: {
        created_at: MoreThan(new Date(after))
      },
      order: {
        updated_at: 'ASC'
      },
      take: first + 1
    });

    const edges = todoDbResult
      .map((todo) => {
        return {
          node: todo,
          cursor: todo.created_at.toISOString()
        };
      })
      .slice(0, first);

    const endCursor =
      todoDbResult.length > 0
        ? todoDbResult[todoDbResult.length - 1].created_at.toISOString()
        : null;

    const startCursor =
      todoDbResult.length > 0 ? todoDbResult[0].created_at.toISOString() : null;

    const getHasPreviousPage = async () => {
      if (!startCursor) {
        return false;
      }

      const previousInDb = await Todo.findOne({
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
      hasNextPage: todoDbResult.length > first,
      endCursor,
      startCursor,
      hasPreviousPage: await getHasPreviousPage()
    };

    return {
      edges,
      pageInfo
    };
  }

  @Mutation(() => Todo)
  async createTodo(@Arg('todoInput') data: CreateTodoInput) {
    const book = Todo.create(data);
    await book.save();
    return book;
  }
}
