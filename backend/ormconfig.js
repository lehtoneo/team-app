// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config;
const { DATABASE_URL } = process.env;

module.exports = {
  type: 'postgres',
  url: DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts']
};
