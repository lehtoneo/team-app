export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface GetByIdArgs {
  id: number;
}

export interface PaginationInput {
  after?: string;
  before?: string;
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

export interface IDEntity {
  id: string;
}

export interface DatesEntity {
  createdAt: string;
  updatedAt: string;
}

export interface IDAndDatesEntity extends IDEntity, DatesEntity {}
