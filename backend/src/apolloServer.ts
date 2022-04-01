import { MyContext } from './types/MyContext';
import { UserResolver } from './resolvers/UserResolver';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { TeamResolver } from './resolvers/TeamResolver';
import { User } from './models/User';
import authService from './services/auth';
import { EventResolver } from './resolvers/EventResolver';

export interface IContext {
  user?: User;
}

const getApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [TeamResolver, UserResolver, EventResolver]
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
