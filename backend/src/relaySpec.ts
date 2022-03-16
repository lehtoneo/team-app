import {
  ObjectType,
  Field,
  ArgsType,
  ClassType,
  Int,
  InputType
} from 'type-graphql';
import { Min, Max } from 'class-validator';
@InputType()
export class PaginationInput {
  @Field((type) => String, {
    nullable: true,
    description: 'Paginate after opaque cursor'
  })
  after?: string;

  @Field((type) => Number, { nullable: true, description: 'Paginate first' })
  @Min(1)
  @Max(20)
  first?: number;
}

@ObjectType()
export class PageInfo {
  @Field((type) => Boolean)
  hasNextPage: boolean;

  @Field((type) => Boolean)
  hasPreviousPage: boolean;

  @Field((type) => String, { nullable: true })
  startCursor: string | null;

  @Field((type) => String, { nullable: true })
  endCursor: string | null;
}

export function EdgeType<NodeType>(
  nodeName: string,
  nodeType: ClassType<NodeType>
) {
  @ObjectType(`${nodeName}Edge`, { isAbstract: true })
  abstract class Edge {
    @Field((type) => nodeType)
    node: NodeType;

    @Field((type) => String, {
      description: 'Used in `before` and `after` args'
    })
    cursor: string;
  }

  return Edge;
}

type ExtractNodeType<EdgeType> = EdgeType;

export function ConnectionType<EdgeType, NodeType = ExtractNodeType<EdgeType>>(
  nodeName: string,
  edgeClass: ClassType<EdgeType>
) {
  @ObjectType(`${nodeName}Connection`, { isAbstract: true })
  abstract class Connection {
    @Field((type) => PageInfo)
    pageInfo: PageInfo;

    @Field((type) => [edgeClass])
    edges: EdgeType[];
  }

  return Connection;
}
