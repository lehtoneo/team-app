import { config } from './config';
import 'reflect-metadata';
import express from 'express';
import AppDataSource from './data-source';
import 'dotenv/config';
import userService from './services/user';
import { getApolloServer } from './apolloServer';
import seeder from './services/seeder';
async function main() {
  const app = express();
  app.use(express.static('frontend-build'));
  const port = config.PORT;
  console.log('Creating DB connection');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await AppDataSource.initialize();
  console.log('DB connection created');
  const isDev = config.NODE_ENV === 'dev';
  await seeder.seed({ resetExcercises: isDev });
  if (isDev) {
    await userService.createDevUserIfNotExists();
  }
  const server = await getApolloServer();
  await server.start();

  server.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
void main();
