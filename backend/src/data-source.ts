import { UserEventAttendance } from './models/UserEventAttendance';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DataSource, DataSourceOptions } from 'typeorm';
import { Team } from './models/Team';
import { User } from './models/User';
import { RefreshToken } from './models/UserRefreshToken';
import 'dotenv/config';
import { Event } from './models/Event';
import { config } from './config';
import { TeamMembership } from './models/TeamMembership';
import { TeamSettings } from './models/TeamSettings';
import { EventType } from './models/EventType';
import { TeamNews } from './models/TeamNews';
import { Weight } from './models/Weight';
import {
  Exercise,
  ExerciseTarget,
  Workout,
  WorkoutExercise,
  WorkoutExerciseSet
} from './models/ExerciseModels';
const { DATABASE_URL, NODE_ENV } = config;

const options: DataSourceOptions = {
  type: 'postgres',
  url: DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [
    User,
    RefreshToken,
    Team,
    Event,
    EventType,
    UserEventAttendance,
    TeamMembership,
    TeamSettings,
    TeamNews,
    Weight,
    Workout,
    WorkoutExercise,
    WorkoutExerciseSet,
    Exercise,
    ExerciseTarget
  ],
  migrations: [],
  subscribers: [],
  extra: {
    ssl: NODE_ENV === 'production'
  }
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const AppDataSource = new DataSource(options);

export default AppDataSource;
