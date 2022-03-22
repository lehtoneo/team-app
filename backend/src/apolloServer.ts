import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { WorkoutResolver } from './resolvers/WorkoutResolver';

const getApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [WorkoutResolver]
  });
  const server = new ApolloServer({ schema });
  return server;
};

export { getApolloServer };
