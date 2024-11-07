import { useNavigate } from 'react-router-dom';
import { TodoItemType } from '../../api/todoApi';
import styles from '../../styles/todo.module.scss';
interface TodoListProps {
  todoList: TodoItemType[];
}

const TodoList: React.FC<TodoListProps> = ({ todoList }) => {
  const navigate = useNavigate();
  function handleClickTodoItem(todoItemId: string) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('id', todoItemId);
    navigate(`/todo?${searchParams.toString()}`, { replace: false });
  }
  return (
    <div className={styles.todoList__container}>
      <div className={styles.todoList__title}>할 일 목록</div>
      {todoList.length === 0 && <div className={styles.todoList__emptyMessage}>할 일 목록이 없습니다.</div>}
      {todoList.length !== 0 &&
        todoList.map((todoItem) => (
          <div key={todoItem.id} className={styles.todoList__item} onClick={() => handleClickTodoItem(todoItem.id)}>
            {todoItem.title}
          </div>
        ))}
    </div>
  );
};

export default TodoList;
