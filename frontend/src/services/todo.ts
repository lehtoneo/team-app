import { Todo } from '../types';
import { apiClient } from './utils/apiClient';

const getById = async (id: number): Promise<Todo> => {
  const response = await apiClient.get<Todo>(`/todos/${id}`);

  return response.data;
};

const getAll = async (): Promise<Todo[]> => {
  const response = await apiClient.get<Todo[]>(`/todos`);
  console.log(response);
  return response.data;
};

export const todoService = {
  getById,
  getAll
};
