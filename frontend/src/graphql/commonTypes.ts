export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface PaginationInput {
  after?: string;
  first?: number;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor?: string;
  startCursor?: string;
}

interface IEdge<T> {
  node: T;
  cursor: string;
}

export interface IConnection<T> {
  edges: IEdge<T>[];
  pageInfo: PageInfo;
}

export interface User {
  id: string;
  email: string;
  firstname: string;
  teams: Team[];
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  start: Date;
  end: Date;
  team: EventTeam;
}

export type EventTeam = Pick<Team, 'id'>;
export type TeamUser = Pick<User, 'id' | 'firstname'>;

export interface Team {
  id: number;
  description?: string;
  name: string;
  members: TeamUser[];
  events: Event[];
}
