import { UserEventAttendance } from './models/UserEventAttendance';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DataSource, DataSourceOptions } from 'typeorm';
import { Team } from './models/Team';
import { User } from './models/User';
import { RefreshToken } from './models/UserRefreshToken';
import 'dotenv/config';
import { Event } from './models/Event';
const { DATABASE_URL, NODE_ENV } = process.env;

const options: DataSourceOptions = {
  type: 'postgres',
  url: DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, RefreshToken, Team, Event, UserEventAttendance],
  migrations: [],
  subscribers: [],
  extra: {
    ssl: NODE_ENV === 'production'
  }
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const AppDataSource = new DataSource(options);

export default AppDataSource;
