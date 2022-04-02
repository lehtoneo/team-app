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
