import React from 'react';
import { Todo } from '../types';

interface ITodoListProps {
  todos: Todo[];
}

const TodoList = (props: ITodoListProps) => {
  return (
    <div>
      {props.todos.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.description}
            <br></br>
            {todo.done ? 'Tehty' : 'Ei tehty'}
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
