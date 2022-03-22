import { UserResolver } from './resolvers/UserResolver';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { WorkoutResolver } from './resolvers/WorkoutResolver';

const getApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [WorkoutResolver, UserResolver]
  });
  const server = new ApolloServer({ schema });
  return server;
};

export { getApolloServer };
