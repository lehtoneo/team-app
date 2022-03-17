// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config;
const { DATABASE_URL, NODE_ENV } = process.env;

module.exports = {
  type: 'postgres',
  url: DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ['src/models/**/*.ts', 'src/models/**/*.js'],
  migrations: ['src/migration/**/*.ts', 'src/migration/**/*.js'],
  subscribers: ['src/subscriber/**/*.ts', 'src/subscriber/**/*.js'],
  extra: {
    ssl: NODE_ENV === "production"
  }
};
