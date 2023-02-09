import {
  ObjectType,
  Field,
  ClassType,
  InputType,
  ArgsType,
  Int
} from 'type-graphql';
import { Min } from 'class-validator';
@InputType()
@ArgsType()
export class PaginationInput {
  @Field(() => String, {
    nullable: true,
    description: 'Paginate after opaque cursor'
  })
  after?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Paginate before opaque cursor'
  })
  before?: string;

  @Field(() => Int, { nullable: true, description: 'Paginate first' })
  @Min(1)
  first?: number;
}

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => String, { nullable: true })
  startCursor: string | null;

  @Field(() => String, { nullable: true })
  endCursor: string | null;
}

export function EdgeType<NodeType>(
  nodeName: string,
  nodeType: ClassType<NodeType>
) {
  @ObjectType(`${nodeName}Edge`, { isAbstract: true })
  abstract class Edge {
    @Field(() => nodeType)
    node: NodeType;

    @Field(() => String, {
      description: 'Used in `before` and `after` args'
    })
    cursor: string;
  }

  return Edge;
}

type ExtractNodeType<EdgeType> = EdgeType;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ConnectionType<EdgeType, NodeType = ExtractNodeType<EdgeType>>(
  nodeName: string,
  edgeClass: ClassType<EdgeType>
) {
  @ObjectType(`${nodeName}Connection`, { isAbstract: true })
  abstract class Connection {
    @Field(() => PageInfo)
    pageInfo: PageInfo;

    @Field(() => [edgeClass])
    edges: EdgeType[];
  }

  return Connection;
}
