import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import { todoService } from './services/todo';
import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const fetchTodos = async () => {
      const todoResult = await todoService.getAll();
      console.log({ todoResult });
      setTodos(todoResult);
    };
    fetchTodos();
  }, []);
  return (
    <div className="App">
      <h1>Todo app</h1>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
