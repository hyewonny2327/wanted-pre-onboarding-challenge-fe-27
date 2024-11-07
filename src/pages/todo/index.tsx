import { useEffect, useState } from 'react';
import AddTodo from '../../components/todo/AddTodo';
import TodoContent from '../../components/todo/TodoContent';
import TodoList from '../../components/todo/TodoList';
import styles from '../../styles/todo.module.scss';
import { deleteTodo, getTodoById, getTodos, TodoItemType, updateTodo } from '../../api/todoApi';
import { useLocation } from 'react-router-dom';
export default function TodoPage() {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [todoItem, setTodoItem] = useState<TodoItemType>();
  const [currentItemId, setCurrentItemId] = useState<string>();
  const location = useLocation();

  async function getTodoList() {
    const res = await getTodos();
    setTodoList(res);
  }

  useEffect(() => {
    getTodoList();
  }, [todoItem]);

  useEffect(() => {
    async function getTodoItemById() {
      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get('id');
      if (id) {
        const res = await getTodoById(id);
        setTodoItem(res);
        setCurrentItemId(id);
      } else {
        setTodoItem(undefined);
      }
    }
    getTodoItemById();
  }, [location.search]);

  async function handleClickUpdateButton(title: string, content: string) {
    try {
      if (currentItemId) {
        const res = await updateTodo(currentItemId, title, content);
        setTodoItem(res);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function handleClickDeleteButton() {
    if (currentItemId) {
      const res = await deleteTodo(currentItemId);
      setTodoItem(res);
    }
  }

  return (
    <div className={styles.container}>
      <AddTodo getTodoList={getTodoList} />
      <section className={styles.todo__listContainer}>
        <div className={styles.todo__list}>
          <TodoList todoList={todoList}></TodoList>
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
