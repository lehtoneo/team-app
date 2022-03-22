import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import 'dotenv/config';

import { getApolloServer } from './apolloServer';
async function main() {
  const app = express();
  app.use(express.static('frontend-build'));
  const port = process.env.PORT || 5000;
  console.log('Creating DB connection');
  await createConnection();
  console.log('DB connection created');
  const server = await getApolloServer();
  await server.start();

  server.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
void main();
