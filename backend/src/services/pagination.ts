/* import {
  DataSource,
  EntityTarget,
  FindOptionsOrder,
  FindOptionsWhere,
  ObjectLiteral,
  Repository
} from 'typeorm';
import AppDataSource from '../data-source';
import { Dates } from '../models/IdAndDates';
import { PageInfo } from '../relaySpec';

type Edge<TNodeType> = {
  node: TNodeType;
  cursor: string;
};
type Connection<TNodeType> = {
  edges: Edge<TNodeType>[];
  pageInfo: PageInfo;
};

export async function FetchPage<TNodeType extends ObjectLiteral extends Dates>(
  target: EntityTarget<TNodeType>,
  size: number,
  where: FindOptionsWhere<TNodeType>,
  getCursor: (node: TNodeType) => string
): Promise<Connection<TNodeType>> {
  const repo = AppDataSource.getRepository(target);

  const dbResult = await repo.find({
    where,
    order,
    take: size + 1
  });
  const edges = dbResult
    .map((node) => {
      return {
        node: node,
        cursor: getCursor(node)
      };
    })
    .slice(0, size);

  const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;

  const startCursor = edges.length > 0 ? edges[0].cursor : null;

  const getHasPreviousPage = async () => {
    if (!startCursor) {
      return false;
    }

    const previousInDb = await Team.findOne({
      where: {
        ...where,
        createdAt: LessThan(new Date(startCursor))
      },
      order: {
        updatedAt: 'DESC'
      }
    });

    return previousInDb !== undefined;
  };
}
*/
