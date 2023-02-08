import { UserInputError } from 'apollo-server-express';
import {
  BaseEntity,
  DataSource,
  EntityTarget,
  FindOptionsOrder,
  FindOptionsOrderProperty,
  FindOptionsWhere,
  LessThan,
  MoreThan,
  ObjectLiteral,
  Repository
} from 'typeorm';
import AppDataSource from '../data-source';
import { Dates } from '../models/IdAndDates';
import { PageInfo, PaginationInput } from '../relaySpec';

type Edge<TNodeType> = {
  node: TNodeType;
  cursor: string;
};
type Connection<TNodeType> = {
  edges: Edge<TNodeType>[];
  pageInfo: PageInfo;
};

export async function fetchPageWithCreatedAtCursor<TNodeType extends Dates>(
  paginationInput: PaginationInput,
  where: FindOptionsWhere<TNodeType>,
  repository: Repository<TNodeType>
): Promise<Connection<TNodeType>> {
  const first = paginationInput?.first || 10;
  const after = paginationInput?.after || undefined;

  let usedWhere = where;

  if (after) {
    const afterIsDate = !isNaN(Date.parse(after));
    if (!afterIsDate) {
      throw new UserInputError('Arg after should be a date string');
    }
    // add 1 millisecond to after to exlude first
    const afterDate = new Date(after);
    usedWhere = {
      ...usedWhere,
      createdAt: LessThan(afterDate)
    };
  } else if (paginationInput?.before) {
    const beforeDate = new Date(paginationInput.before);
    usedWhere = {
      ...usedWhere,
      createdAt: MoreThan(beforeDate)
    };
  }

  const order = {
    createdAt: paginationInput.before ? 'ASC' : 'DESC'
  } as unknown as FindOptionsOrder<TNodeType>;

  let dbResult = await repository.find({
    where: usedWhere,
    order,
    take: first + 1
  });

  if (paginationInput?.before) {
    dbResult = dbResult.reverse();
  }

  const edges = dbResult
    .map((node) => {
      return {
        node: node,
        cursor: node.createdAt.toISOString()
      };
    })
    .slice(0, first);

  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
  const startCursor = edges.length > 0 ? edges[0].cursor : null;

  const getHasPreviousPage = async () => {
    if (!startCursor) {
      return false;
    }

    const newWhere = {
      ...usedWhere,
      createdAt: MoreThan(startCursor)
    };
    const previousInDb = await repository.findOne({
      order,
      where: newWhere
    });

    return previousInDb !== null;
  };
  const hasPreviousPage = await getHasPreviousPage();

  const pageInfo: PageInfo = {
    hasNextPage: dbResult.length > first,
    endCursor,
    startCursor,
    hasPreviousPage: hasPreviousPage
  };

  return {
    edges,
    pageInfo
  };
}
