import React from 'react';
import useTodoConnection from '../../hooks/useTodoConnection';
import TodoList from '../TodoList';

const LandingPage = () => {
  const { todos } = useTodoConnection();
  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};

export default LandingPage;
