import axios from 'axios';
import { getAuthToken } from '../utils/getAuthToken';
const token = getAuthToken();

const todoApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
    Authorization: `Bearer ${token}`,
  },
});

export type TodoItemType = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export async function getTodos(): Promise<TodoItemType[]> {
  const res = await todoApi.get('/todos');

  return res.data.data as TodoItemType[]; // 'data' 객체 안의 'data' 배열 반환
}

export async function createTodo(title: string, content: string): Promise<TodoItemType> {
  const res = await todoApi.post('/todos', {
    title: title,
    content: content,
  });
  return res.data.data as TodoItemType;
}