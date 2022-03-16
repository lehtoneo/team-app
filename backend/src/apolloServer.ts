import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { TodoResolver } from './resolvers/TodoResolver';

const getApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [TodoResolver]
  });
  const server = new ApolloServer({ schema });
  return server;
};

export { getApolloServer };
