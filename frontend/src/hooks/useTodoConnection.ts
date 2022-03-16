import React from 'react';
import {
  TodoConnectionData,
  TODO_CONNECTION
} from './../graphql/queries/todoConnection';
import { useQuery } from '@apollo/client';

import { PaginationInput } from './../graphql/commonTypes';

const useTodoConnection = (args?: PaginationInput) => {
  const { data, loading } = useQuery<TodoConnectionData>(TODO_CONNECTION, {
    variables: {
      paginationInput: args
    },
    onError: (e) => {
      console.log(e);
    }
  });

  return {
    todos: data?.todoConnection?.edges.map((edge) => edge.node) || [],
    loading
  };
};

export default useTodoConnection;
