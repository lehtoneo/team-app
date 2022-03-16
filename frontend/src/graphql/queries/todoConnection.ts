import { gql } from '@apollo/client';
import { IConnection, Todo } from './../commonTypes';

type TodoListInfo = Pick<Todo, 'description' | 'id' | 'done'>;

type TodoConnection = IConnection<TodoListInfo>;

export const TODO_CONNECTION = gql`
  query todoConnection($paginationInput: PaginationInput) {
    todoConnection(paginationInput: $paginationInput) {
      edges {
        node {
          id
          description
          done
        }
        cursor
      }

      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;

export interface TodoConnectionData {
  todoConnection?: TodoConnection | null;
}
