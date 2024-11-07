import { useEffect, useState } from 'react';
import AddTodo from '../../components/todo/AddTodo';
import TodoContent from '../../components/todo/TodoContent';
import TodoList from '../../components/todo/TodoList';
import styles from '../../styles/todo.module.scss';
import { getTodos, TodoItemType } from '../../api/todoApi';
export default function TodoPage() {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  useEffect(() => {
    async function getTodoList() {
      const res = await getTodos();
      setTodoList(res);
    }
    getTodoList();
  }, []);
  return (
    <div className={styles.container}>
      <AddTodo />
      <section className={styles.todoList__listContainer}>
        <div className={styles.todoList__list}>
          <TodoList todoList={todoList}></TodoList>
        </div>
        <div className={styles.todoList__content}>
          <TodoContent></TodoContent>
        </div>
      </section>
    </div>
  );
}
