import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { getApolloServer } from './apolloServer';
async function main() {
  const app = express();
  app.use(express.static('../frontend-build'))
  const port = 5000;
  await createConnection();

  const server = await getApolloServer();
  await server.start();

  await server.applyMiddleware({ app });
  await app.listen({ port });
  console.log(`Server running on port ${port}`);
}
main();
