import { useEffect, useState } from 'react';
import AddTodo from '../../components/todo/AddTodo';
import TodoContent from '../../components/todo/TodoContent';
import TodoList from '../../components/todo/TodoList';
import styles from '../../styles/todo.module.scss';
import { createTodo, deleteTodo, getTodoById, getTodos, TodoItemType, updateTodo } from '../../api/todoApi';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
export default function TodoPage() {
  //const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  //const [todoItem, setTodoItem] = useState<TodoItemType>();
  const [currentItemId, setCurrentItemId] = useState<string>();
  const location = useLocation();

  const queryClient = useQueryClient();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (id) {
      setCurrentItemId(id);
    }
  }, [location.search]);

  //todo 목록 받아오기
  const { data: todoList } = useQuery<TodoItemType[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
  //todo 개별 데이터 받아오기
  const { data: todoItem } = useQuery<TodoItemType>({
    queryKey: ['todoItem', currentItemId],
    queryFn: () => getTodoById(currentItemId!),
    enabled: !!currentItemId,
  });
  //todo 생성하기
  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  //todo 수정하기
  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todoItem'] });
    },
    onError: (error) => {
      console.error('데이터를 정상적으로 불러오지 못함', error);
    },
  });
  //todo 삭제하기
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todoItem'] });
    },
  });
  function handleClickUpdateButton(title: string, content: string) {
    if (currentItemId) {
      updateTodoMutation.mutate({ id: currentItemId, title, content });
    }
  }
  async function handleClickDeleteButton() {
    if (currentItemId) {
      deleteTodoMutation.mutate(currentItemId);
    }
  }

  return (
    <div className={styles.container}>
      <AddTodo createTodoMutation={createTodoMutation} />
      <section className={styles.todo__listContainer}>
        <div className={styles.todo__list}>
          <TodoList todoList={todoList || []}></TodoList>
        </div>
        <div className={styles.todo__content}>
          <TodoContent
            todoItem={todoItem}
            handleClickUpdateButton={handleClickUpdateButton}
            handleClickDeleteButton={handleClickDeleteButton}
          ></TodoContent>
        </div>
      </section>
    </div>
  );
}
