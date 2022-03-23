import { MyContext } from './types/MyContext';
import { UserResolver } from './resolvers/UserResolver';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { WorkoutResolver } from './resolvers/WorkoutResolver';
import { User } from './models/User';
import authService from './services/auth';

export interface IContext {
  user?: User;
}

const getApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [WorkoutResolver, UserResolver]
  });
  const server = new ApolloServer({
    schema,
    context: async ({ req, res }): Promise<MyContext> => {
      const user = await authService.validateAccessToken(req?.headers);
      return {
        req,
        res,
        payload: {
          user
        }
      };
    }
  });
  return server;
};

export { getApolloServer };
